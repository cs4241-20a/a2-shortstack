const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appData = [
  { 'number': 0, 'firstName': "A", 'lastName': "Baker", 'goals':  0, 'assists': 0, 'points': 0 },
  { 'number': 3, 'firstName': "C", 'lastName': "Davis", 'goals':  0, 'assists': 0, 'points': 0 },
  { 'number': 64, 'firstName': "E", 'lastName': "Fontaine", 'goals':  0, 'assists': 0, 'points': 0 },
  { 'number': 38, 'firstName': "G", 'lastName': "Hart", 'goals':  0, 'assists': 0, 'points': 0 },
  { 'number': 7, 'firstName': "I", 'lastName': "Johnson", 'goals':  0, 'assists': 0, 'points': 0 }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if(request.url === '/appData'){
    response.writeHeader( 200, {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( appData ) )
    response.end()
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    // console.log( JSON.parse( dataString ) )

    const data = JSON.parse(dataString)
    let date = new Date(Date.now())
    console.log(getCurrentDayAndTime())
    let time = getCurrentDayAndTime()
    appdata.push({ 'title': data['title'], 'author': data['author'], 'comment': data['comment'], 'time': time })
    console.log(data['title'])
    console.log("App Data: " + JSON.stringify(appdata))
    console.log("Data: " + dataString)
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( dataString ) )
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

server.listen( process.env.PORT || port )
