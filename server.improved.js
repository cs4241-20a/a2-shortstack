const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//Format: { "id": 0, "kills": 0, "assists": 0, "deaths": 0, "kd_ratio": 0, "ad_ratio": 0 },
const appdata = [];

let id = 1;

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if(request.url === '/') {
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
    let data = JSON.parse(dataString);
    console.log(data);

    if(request.url === "/add") {
        addItem(data);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    }else if(request.url === "/modify"){
        modifyItem(data);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    }else if(request.url === "/delete"){
        deleteItem(data);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    }else{
        response.writeHead(400, "Invalid request type", {'Content-Type': 'text/plain'});
    }

    response.end()
  })
}

const addItem = function(data){
  console.log("adding");
  appdata.push({
    "id": id,
    "kills": data.kills,
    "assists": data.assists,
    "deaths": data.kills,
    "kd_ratio": data.kills / data.deaths,
    "ad_ratio": data.assists / data.deaths
  })
  id++;
}

const modifyItem = function(data){
  console.log("modifying");
}

const deleteItem = function(data){
  console.log("deleting");
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
