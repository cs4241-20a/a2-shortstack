const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      moment = require('moment'),
      dir  = 'public/',
      port = 3000

const calculateDeadline = function(prio){
  var deadlineVal = 0;
  if(prio === "low"){
      deadlineVal+=4;
  }

  if(prio === "medium"){
    deadlineVal+=2;
  }

  if(prio === "high"){
      deadlineVal++;
  }
  var finalDeadline = moment().add(deadlineVal, "days").format("MM/DD/YYYY")
  return finalDeadline;
}

let appdata = [
  { 'name': 'Dishes', 'task': 'Wash the dishes', 'priority': 'low', 'deadline': calculateDeadline('low'), 'id': '1'},
  { 'name': 'Vacuum', 'task': 'Vacuum the apartment', 'priority': 'medium', 'deadline':calculateDeadline('medium'), 'id': '2'},
  { 'name': 'Homework', 'task': 'Complete homework by tomorrow!!', 'priority': 'high', 'deadline': calculateDeadline('high'), 'id': '3'}
];

var taskID = 3;

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice(1)

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === "/api/getData"){
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.write(JSON.stringify(appdata));
    response.end()
  }
  else{
    sendFile( response, filename )
  }
}

//Returns true a task contains the same ID as the object being deleted
const compareIDs = function (task, object){
  if(task.id.toString() === object.val.toString()){
    return true;
  }
  else {
    return false;
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    console.log(JSON.parse(dataString))
    const object = JSON.parse(dataString);

    if(object.hasOwnProperty('delete')){
      appdata.splice(appdata.findIndex(task => compareIDs(task, object)), 1);
      response.writeHead(200, "OK", {'Content-Type': 'application/json'})
      response.write(JSON.stringify(appdata));
      response.end();
      return false;
    }

    object.deadline = calculateDeadline(object.priority);
    taskID++;
    object.id = taskID;

    appdata.push(object);
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.write(JSON.stringify(appdata));
    response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename )

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader(200, { 'Content-Type': type })
       response.end(content)

     }else{

       // file not found, error code 404
       response.writeHeader(404);
       response.end('404 Error: File Not Found');

     }
   })
}

server.listen( process.env.PORT || port );
