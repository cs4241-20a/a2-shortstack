const { stringify } = require('querystring')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { firstname: "Joe", lastname: "Bonchon", cameramake: "Canon", cameramodel: "A-1", cameraformat: "35mm", price: 150, conditon: 76, bargain: false, delete: false, id: 1 },
  { firstname: "Pongo", lastname: "Pwaga", cameramake: "Nikon", cameramodel: "FTn", cameraformat: "35mm", price: 95, conditon: 90, bargain: true, delete: false, id: 2 },
  { firstname: "Toe", lastname: "Progle", cameramake: "Yashica", cameramodel: "Mat124G", cameraformat: "6x6", price: 50, conditon: 100, bargain: true, delete: false, id: 3 }
]

// server creation
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) { // true for index, JS, CSS, etc.
    handleGet( request, response )    
  }else if( request.method === 'POST' ){ // submitting user data
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  console.log( filename )
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
    console.log( "sending webpage" )
  } else if( filename === "public/appdata" ){
    sendData( response, appdata )
    console.log( "sending appdata:" + JSON.stringify( appdata ) )
  }else{
    sendFile( response, filename )
    console.log( "sending the following file: " + filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  const bargain = 'bargain'
  request.on( 'end', function() {

    incomingData = JSON.parse( dataString )
    // let's determine what type of request we're dealing with

    // delete by ID
    if( incomingData.delete === true ){
      console.log( "deleting entry" )
      incomingData.id = parseInt( incomingData.id )
      for( var i = 0; i< appdata.length; i++ ) {
        if( incomingData.id === appdata[i].id ) {
          appdata.splice( i, 1 )
          console.log( "Removed Listing with ID: " + incomingData.id )
          break
        }
      }
    }

    else {
    // convert prices and conditions to ints
    incomingData.price = parseInt( incomingData.price )
    incomingData.condition = parseInt( incomingData.condition )

    // the data has an ID and was not deleted so it must be an update
    if( incomingData.id != null ) {
      console.log( "updating entry" )
      incomingData.id = parseInt( incomingData.id )
      for( var i = 0; i< appdata.length; i++ ) {
        if( incomingData.id === appdata[i].id ) {
          appdata[i] = incomingData
          console.log( "Updated Listing" )
          break
        }
      }
    }
    else
    {
      // let's add a new element to the list and determine if this is a good bargain.
      incomingData.price = parseInt( incomingData.price )
      incomingData.condition = parseInt( incomingData.condition )
      var isBargain = true


      if( ( incomingData.price > incomingData.condition ) && incomingData.condition < 50 ) {
        isBargain = false
      }
      incomingData[bargain] = isBargain

      // let's assign an ID to this listing
      // first let's check if there are any gaps in the IDs

      if( appdata[appdata.length - 1].id === appdata.length ){
        // the last ID and length matches!
        incomingData["id"] = appdata.length + 1
        appdata.push( incomingData )
      }else{
        for( var i = 0; i < appdata.length; i++ ){
          if( appdata[i].id != i + 1 ){
            incomingData["id"] = i + 1
            appdata.splice( i, 0, incomingData )
            break
          }
        }
      }

  }
}
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendFile = function( response, filename ) {

   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const sendData = function( response, dataname ) {

  transmitdata = JSON.stringify( dataname )
  console.log( transmitdata )

      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': "text/plain" })
    
      response.write( transmitdata )
      response.end()
}

server.listen( process.env.PORT || port )
