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

const readData = fs.readFileSync('tasks.json','utf8')
const appdata= JSON.parse(readData)

const updateFile= function(){
  fs.writeFile('tasks.json', JSON.stringify(appdata), (error) => { 
    // In case of a error throw err exception. 
    if (error) throw err; 
  }) 
}
// calculates the priority of a task given the expected hours of work
const calculatePriority= function (expected){
  var expected = Number(expected)
  let priority="no priority"
  if (expected>5){
    priority= "high"
  }
  else if (expected >2){
    priority = "medium"
  }
  else{
    priority="low"
  }
  return priority
}
//handles deleting the last entry
const deleteData = function(request, response){
  appdata.tasks.pop()
  updateFile()
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
  response.end()
}

//handles updating new data 
const updateData = function(request, response){
  let jsonData;
  request.on('data', function(data){
    jsonData= JSON.parse(data);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    jsonData["date"]=date
    let priority = calculatePriority(jsonData.expected)
    jsonData["priority"]= priority
    appdata.tasks.push(jsonData)
    updateFile()
  })
  request.on( 'end', function() {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    console.log(appdata)
    response.write(JSON.stringify(jsonData))
    response.end()
  })
}
const handlePost = function( request, response ) {

  if (request.url === '/submit'){
    updateData(request,response);
  }
  else if (request.url==='/delete'){
    console.log("delete is working somewhat")
    deleteData(request,response);
  }
  else{
    let dataString = ''

    request.on( 'data', function( data ) {
        console.log(data)
        dataString += data 
    })

    request.on( 'end', function() {
      console.log( "parse "+JSON.parse( dataString ) )

      // ... do something with the data here!!!
      response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
      response.write(appdata)
      response.end()
      //response.end(dataString)
    })
  }
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/showData'){
    console.log(appdata)
    console.log("sending file")
    sendFile(response, 'tasks.json')
  }
  else{
    console.log(request.url)
    sendFile( response, filename )
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end(content)

     }else{

       // file not found, error code 404
       response.writeHeader( 404)
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
