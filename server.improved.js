const http = require( 'http' );
const fs = require( 'fs' );
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
const mime = require( 'mime' );
const dir = 'public/';
const port = 3000;

const data = [
  { name: "Matt", location: "Elm Park", distance: 2.5, time: 25, speed: 6 },
  { name: "Juliet", location: "Hadwen Arboretum", distance: 4, time: 35, speed: 6.86 },
  { name: "Luke", location: "Indian Lake", distance: 6.5, time: 40, speed: 9.75 },
  { name: "Kate", location: "Green Hill Park", distance: 7, time: 80, speed: 5.25 },
];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );
  }else if( request.method === 'POST' ){
    handlePost( request, response );
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
  } else if (request.url === '/getRuns') {
    sendData( response );
  } else {
    sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  console.log(`Attempted post URL: ${request.url}`);
  if(request.url === '/addRun') {
    addRun(request, response);
  } else if (request.url === '/deleteRun') {
    deleteRun(request, response);
  } else if (request.url === '/editRuns') {
    editRuns(request, response);
  } else {
    response.writeHead( 409, "BAD_REQUEST", {'Content-Type': 'text/plain'});
    response.end('Resource does not exist.');
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );

     }
   });
}

const addRun = function (request, response) {
  let dataString = '';
  request.on('data', function( newRun ) {
    dataString += newRun;
    console.log(`Run received: ${dataString}`);
  });
  request.on('end', function() {
    let newRun = JSON.parse(dataString);
    newRun.speed = newRun.distance * 60 / newRun.time;
    data.push(newRun);
    console.log(`New runs: ${JSON.stringify(data)}`);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
    response.end();
  });
}

const deleteRun = function (request, response) {
  let dataString = ''
  request.on('data', function( newRun ) {
    dataString += newRun;
    console.log(`Index to delete: ${dataString}`);
  });
  request.on('end', function() {
    let deleteIndex = parseInt(dataString);
    data.splice(deleteIndex, 1);  // Remove 1 item at deleteIndex
    console.log(`New runs: ${JSON.stringify(data)}`);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
    response.end();
  });
}

const editRuns = function (request, response) {
  let dataString = '';
  request.on('data', function( editedRuns ) {
    dataString += editedRuns;
    console.log(`Run received: ${dataString}`);
  });
  request.on('end', function() {
    let editedRuns = JSON.parse(dataString);
    for(let i = 0; i < editedRuns.length; i++) {
      editedRuns[i].speed = editedRuns[i].distance * 60 / editedRuns[i].time;
    }
    data.splice(0, data.length); // clear data
    for (let i = 0; i < editedRuns.length; i++) {
      data.push(editedRuns[i]);
    }
    console.log(`New runs: ${JSON.stringify(data)}`);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
    response.end();
  });
}

const samplePost = function(request, response) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  });

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) );

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end();
  });
}

const sendData = function( response ) {
  response.writeHeader (200, {'Content-Type': 'text/json'});
  response.end(JSON.stringify(data));
}

server.listen( process.env.PORT || port );
