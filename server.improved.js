const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var golfbag = [
  { 'manufacturer': 'Ping', 'model': 'G410', 'type': 'Driver', 'loft': 9.5, 'distance': 280, 'ballSpeed': 160, 'swingSpeed': 106.7},
  { 'manufacturer': 'Taylormade', 'model': 'Rocketballz', 'type': '3 Wood', 'loft': 15, 'distance': 260, 'ballSpeed': 148, 'swingSpeed': 99},
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
  }
  else if ( request.url == '/golfbag') {
    response.writeHead(200, "OK", {'Content-Type': 'application/json'})
    response.end(JSON.stringify(golfbag))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    var newClub = JSON.parse(dataString);
    console.log( newClub );
    // do server side calculation
    newClub.ballSpeed = (newClub.distance / 1.75).toFixed(1);
    newClub.swingSpeed = (newClub.ballSpeed / 1.5).toFixed(1);
    // update golfbag array
    golfbag.push(newClub);
    // sort golfbag by club distance
    golfbag.sort(function(a , b) {
      if (a.distance < b.distance) {
        return 1;
      }
      if (a.distance > b.distance) {
        return -1;
      }
      return 0;
    })
    // return updated array
    response.writeHead(200, "OK", {'Content-Type': 'application/json'})
    response.end(JSON.stringify(golfbag))
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
