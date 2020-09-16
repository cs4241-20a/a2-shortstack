const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let serverdata = [];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if ( request.url === '/results' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
    response.end(JSON.stringify(serverdata));
  }else {
    sendFile( response, filename )
  }
  return serverdata;
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    serverdata.push(JSON.parse(dataString));

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
    console.log(serverdata);
    response.end()
  })
}

const handleDelete = function( request, response ) {
  let dataString = ''
  
  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    const item = JSON.parse(dataString);
    const index = item.rowid;
    serverdata.splice(index-2, 1);
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    console.log(serverdata);
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

server.listen( process.env.PORT || port )
