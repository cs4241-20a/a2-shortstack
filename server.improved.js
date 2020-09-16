let dataStorage = [];
let num = 0;
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
//      sql = require('sqlite3'),
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

//const db = new sql.Database('database.sqlite');

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  // request.on( 'data', function( data ) {
  // })
  // request.on( 'end', function() {
  //   console.log(dataStorage);
  //   let res = JSON.stringify("[" + dataStorage.toString() + "]");
  //   response.writeHead( 200, "OK", {'Content-Type': 'json' });
  //   response.end( JSON.stringify(dataStorage));
  // })
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/init'){
    response.writeHead( 200, "OK", {'Content-Type': 'json' })
    response.end(JSON.stringify(dataStorage));
    //response.end( dataStorage )
  }else{
    sendFile( response, filename )
  }

}


const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      //console.log(data);
      dataString = dataString + data;
  })

  request.on( 'end', function() {
    dataString = JSON.parse(dataString)
    let jsonTemp = { id: num, date: dataString.date, todo: dataString.todo, checked: false };
    num ++;
    let body = JSON.stringify( jsonTemp );
    dataStorage.push(body);
    console.log(dataStorage);
    
    let res = JSON.stringify("[" + dataStorage.toString() + "]")
    
    response.writeHead( 200, "OK", {'Content-Type': 'json' })
    response.end( res )
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

server.listen( process.env.PORT || port );

