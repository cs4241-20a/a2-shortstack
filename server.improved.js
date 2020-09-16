const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  
]

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
  else if (request.url === '/results') {
    response.setHeader("Content-Type", "application/json")
    response.end(JSON.stringify(appdata))
  } 
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    // const appdata=[]
    const info = JSON.parse( dataString )
    //info.sum = "kkk"+info.studentId
    if(info.currentYear === "Freshman"){
      info.expectedLeaveYear = "2024"
    }
    if(info.currentYear === "Sophomore"){
      info.expectedLeaveYear = "2023"
    }
    if(info.currentYear === "Junior"){
      info.expectedLeaveYear = "2022"
    }
    if(info.currentYear === "Senior"){
      info.expectedLeaveYear = "2021"
    }
    appdata.push(info)
    console.log(appdata)

    // ... do something with the data here!!!

    response.writeHeader( 200, {'Content-Type': 'text/plain' })
    response.end( JSON.stringify(appdata) )
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
