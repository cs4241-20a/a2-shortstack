let PouchDb = require('pouchdb');

let db = new PouchDb('my_db');

var entry_id = 0

const statusCode = 200
const errorCode = 404

const appdata = []

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

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    
       // ... do something with the data here!!!
    
    
    const json = JSON.parse(dataString)
    entry_id++;
    let entry = { id : entry_id }

    // parse in the table entries
    db.put({"_id": JSON.stringify( entry_id), "name": JSON.stringify( json.name ), "favarite_game": JSON.stringify( json.favarite_game ), 
           "game_cost": JSON.stringify( json.game_cost ), "hours_played":JSON.stringify( json.hours_played ), "cost_per_hour":JSON.stringify( json.cost_per_hour )})

    response.writeHead( statusCode, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( entry ))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       // status code: https://httpstatuses.com
       response.writeHeader( statusCode, { 'Content-Type': type })
       response.end( content )
     }else{
       // file not found, error code 404
       response.writeHeader( errorCode )
       response.end( '404 Error: File Not Found' )
     }
     
   })
}

server.listen( process.env.PORT || port )
