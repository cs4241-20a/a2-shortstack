const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    if( request.url === '/updateScore' ) {
      let tempScore
      request.on( 'data', function( data ) {
        let TAT = JSON.parse(data)
        tempScore = TAT["score"]
      })

      request.on( 'end', function() {
        if (highScore === "None") {
          highScore = tempScore
          highestSubmitted = lastSubmitted
        } else {
          if (parseInt(highScore) > parseInt(tempScore)){
            highScore = tempScore
            highestSubmitted = lastSubmitted
          }
        }
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
      })

    } else {
      console.log(request.url)
      handlePost( request, response ) 
    } 
  }
})

let answer = "-1";
let lastSubmitted = "";
let highestSubmitted = "None";
let highScore = "None";

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/getAns' ){
    answer = "" + Math.floor(Math.random() * 10);
    response.writeHeader( 200, "OK", { 'Content-Type': 'text/plain' })
    response.end( answer )
  } else if ( request.url === '/getField' ){
    rsp = [{"answer":answer},{"lastSubmitted":lastSubmitted},{"highestSubmitted":highestSubmitted},{"highScore":highScore}]
    
    response.writeHeader( 200, "OK", { 'Content-Type': 'application/json' })
    response.end( JSON.stringify(rsp) )
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
    parsed = JSON.parse( dataString ) 
    lastSubmitted = parsed["yourname"]
    console.log(lastSubmitted)

    if (lastSubmitted === answer){
      dataString = "succeed!"
    } else {
      dataString = "failed!"
    }

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(dataString)
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
