const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      moment = require( 'moment' ),
      dir  = 'public/',
      port = 3000

let tasks = [
  {taskName: "dishes", priority: "8", creationDate: "09/11/2020", dueDate: moment().add(2, 'days').format("MM/DD/YYYY")},
  {taskName: "laundry", priority: "4", creationDate: "09/12/2020", dueDate: moment().add(6, 'days').format("MM/DD/YYYY")},
  {taskName: "homework", priority: "6", creationDate: "09/13/2020", dueDate: moment().add(4, 'days').format("MM/DD/YYYY")}
];

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
  else if (request.url === '/tasks'){
    sendFile( response.end(JSON.stringify(tasks)), 'public/tasks.html')
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data
      data.dueDate = 2;
  })
 
  request.on( 'end', function() {
    tasks.push(JSON.parse(dataString));
    let prior = JSON.parse(dataString).priority;
  
    // This will calculate the current date using moment 
    let month = moment().get('month') + 1;
    let day = moment().get('date');
    let year = moment().get('year');
    let date = "0" + month + "/" + day + "/" + year;
    tasks[tasks.length-1].creationDate = date;

    // This will calculate the due date of the task based on the priority and the creation date.
    if (prior){
      tasks[tasks.length-1].dueDate = moment().add((10-prior), 'days').format("MM/DD/YYYY");
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(tasks[tasks.length-1]));
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
