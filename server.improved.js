const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var passwords_data = require('./public/passwords.json')

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE'){
    handleDelete (request,response)
  }else if( request.method === 'PUT'){
    handleModify(request,response)
  }else{
    response.writeHeader(404)
    response.end('Error')
  }
})

const handleGet = function(request, response) {
  const filename = dir + request.url.slice( 1 ) 
  console.log("GET: ", filename)
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if(request.url === '/submit'){
    response.writeHeader(200,{'Content-Type': 'text/plain'})
    response.end(JSON.stringify(passwords_data))
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function(request, response) {
  console.log('POST:',request.url)
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    data = JSON.parse(dataString)
    if (request.url === '/submit'){
      
      const password = "".concat(data.name,data.major,data.collegeyear,data.number)
      data.password = password
      passwords_data.push(data)
      response.writeHeader(200,{'Content-Type': 'text/plain'})
      response.end()
    }
    else{
    response.writeHeader(404)
    response.end('Error')
    }
  })
}

const handleModify = function(request,response){
  let path = require('url').parse(request.url, true);
  const pathname = path.pathname
  //the modified data sent by user
  let dataString = ''
  request.on('data',function(data) {
      dataString += data 
  })
  request.on( 'end', function() {
    data = JSON.parse(dataString)
    if (pathname === '/modify'){
      const query = path.query.idx
      passwords_data[query].name = data.name
      passwords_data[query].major = data.major
      passwords_data[query].collegeyear = data.collegeyear
      passwords_data[query].number = data.number
      const password = "".concat(data.name,data.major,data.collegeyear,data.number)
      passwords_data[query].password = password

      response.writeHeader(200,{'Content-Type': 'text/plain'})
      response.end()
  } else{
    response.writeHeader(404)
    response.end('Error')
    }
  })
}

const handleDelete = function(request,response){
  console.log('DELETE:', request.url)
  let path = require('url').parse(request.url, true);
  const pathname = path.pathname
  if(pathname === '/submit'){
    //parse the idx from the path
    const query = path.query.idx
    passwords_data.splice(query,1)
    response.writeHeader(200,{'Content-Type': 'text/plain'})
    response.end()
  }else{
    response.writeHeader(404)
    response.end('Error')
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
console.log("The server is running at http://localhost:3000")
