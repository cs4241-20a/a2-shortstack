const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

// List of users that have entered guesses
let activeUsers = []
let magicNumber = Math.floor((Math.random() * 10000) + 1);
console.log(magicNumber)

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if (request.url === '/table') {
    response.end(JSON.stringify(activeUsers))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {

  request.on( 'data', function( data ) {
    const dataObject = JSON.parse(data)

    for (let i = 0; i < activeUsers.length; i++) {

      if (dataObject.username === activeUsers[i].username) {

        if (activeUsers[i].win) {
          return
        }

        if (dataObject.remove) {
          activeUsers.splice(i, 1)
          return
        }
        else {
          let status = generateStatus(dataObject.guess)

          activeUsers[i].guess = dataObject.guess
          activeUsers[i].status = status
          activeUsers[i].attempts++
          activeUsers[i].timestamp = dataObject.timestamp

          if (status === "Winner!") {
            activeUsers[i].win = true;
            activeUsers[i].guess = "*****" //Hidden from other players
          }
          return
        }
      }
    }

    if (!dataObject.remove) {

      let newStoredGuess = {
        win: false,
        username: dataObject.username,
        guess: dataObject.guess,
        status: generateStatus(dataObject.guess),
        attempts: 1,
        timestamp: dataObject.timestamp
      }

      if (newStoredGuess.status === "Winner!") {
        newStoredGuess.win = true;
        newStoredGuess.guess = "*****" //Hidden from other players
      }

      activeUsers.push(newStoredGuess)
    }
  })

  request.on( 'end', function() {

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(activeUsers))
  })
}

function generateStatus(guess) {

  let guessAsInt = parseInt(guess, 10)

  if (guessAsInt === magicNumber) {
    return "Winner!"
  }
  if ( guessAsInt < magicNumber) {
    return "Too Low"
  }
  if ( guessAsInt > magicNumber) {
    return "Too High"
  }
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
