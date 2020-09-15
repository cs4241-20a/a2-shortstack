const { stringify } = require('querystring')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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

    if( incomingData.delete === true ){
      console.log( "deleting entry" )
      incomingData.id = parseInt( incomingData.id )
      for( var i = 0; i< appdata.length; i++ ) {
        //  console.log( "incomingData:" + incomingData + "Listing:" + appdata[i])
        if( incomingData.id === appdata[i].id ) {
          appdata.splice( i, 1 )
          console.log( "Removed Listing with ID: " + incomingData.id )
        }
      }
    }
    else {
    // convert prices and conditions to ints
    incomingData.price = parseInt( incomingData.price )
    incomingData.condition = parseInt( incomingData.condition )
    console.log( incomingData )

    // the data has an ID, so it is either an update listing or delete request
    if( incomingData.id != null ) {
      console.log( "updating entry" )
      incomingData.id = parseInt( incomingData.id )
      for( var i = 0; i< appdata.length; i++ ) {
        //  console.log( "incomingData:" + incomingData + "Listing:" + appdata[i])
        if( incomingData.id === appdata[i].id ) {
          appdata[i] = incomingData
          console.log( "Updated Listing" )
        }
      }
    }
    else
    {
      // is this camera a good bargin?
      incomingData.price = parseInt( incomingData.price )
      incomingData.condition = parseInt( incomingData.condition )
      var isBargain = true


      if( incomingData.price > 1 && incomingData.condition < 10 ) {
        console.log( "This is stupid" )
        isBargain = false
      }
      incomingData[bargain] = isBargain

      incomingData["id"] = appdata.length + 1

      appdata.push( incomingData )

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
