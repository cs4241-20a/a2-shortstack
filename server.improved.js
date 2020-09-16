const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const appdata = [
  { task : 'dishes', DueDate :1, Priority: 1 },
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if (request.method === 'DELETE'){
    handleDelete(request, response)
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
    incomingData = JSON.parse( dataString )

    const TASK = incomingData.Task
    const daysTillDue = incomingData.DaysTillDue
    const day = incomingData.curDate

    //get the date that the task is due
    var dueDate = parseInt(day,10) + (parseInt(daysTillDue, 10) * 86400000)

    //calculate the priority
    var PRIORITY = dueDate - new Date().getTime()
    var task = JSON.stringify({ Task: TASK, DaysTillDue: daysTillDue, Priority: PRIORITY })

    //adds the current task to the server database
    appdata.push(task)

    //sends the response
    if(isNaN(dueDate)){
      console.log("Days Till Due was not a number")
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      let body = JSON.stringify({ dataBase: 'Bad Input'})
      response.end( body )
    }else{
      console.log("Sent Data Base")
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end( task )
    }
    
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
