const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      moment = require( 'moment' ),
      dir  = 'public/',
      port = 3000

let tasks = [
  {taskName: "dishes", priority: "8", creationDate: "9/11/2020", dueDate: moment().add(2, 'days').format("MM/DD/YYYY")},
  {taskName: "laundry", priority: "4", creationDate: "9/11/2020", dueDate: moment().add(6, 'days').format("MM/DD/YYYY")},
  {taskName: "homework", priority: "6", creationDate: "9/11/2020", dueDate: moment().add(4, 'days').format("MM/DD/YYYY")}
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
  }else{
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
    
    if (prior){
      tasks[tasks.length-1].dueDate = moment().add((10-prior), 'days').format("MM/DD/YYYY");
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(tasks));
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
