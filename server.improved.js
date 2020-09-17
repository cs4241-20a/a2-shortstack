const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'task': 'Example Task', 'priority': '2', 'date': '2020-9-16', 'due': '2020-9-18'}
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
  else if(request.url === '/appData'){
    console.log('Sending: ' + appdata)
    response.write(JSON.stringify(appdata));
    response.end();
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if(request.url === '/submit') {
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      console.log('Data in Server: ')
      console.log( JSON.parse( dataString ) )

      appdata[appdata.length] = JSON.parse(dataString);

      // ... do something with the data here!!

      var data = JSON.stringify(appdata);
      console.log('Sending: ' + appdata);

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.write(data)
      console.log(data)
      response.end()
    })
  }
  else if(request.url === '/delete') {
    console.log('Delete')
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })
    
    request.on( 'end', function() {
      var data = JSON.parse(dataString)

      var index = -1;
      for(var i = 0; i < appdata.length; i++) {
        if(appdata[i].task == data.task && appdata[i].priority == data.priority
          && appdata[i].date == data.date && appdata[i].due == data.due) {
          index = i;
          break;
        }
      }
      appdata.splice(index, 1)
      
      var data = JSON.stringify(appdata);
      console.log('Sending: ' + appdata);
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.write(data)
      console.log(data)
      response.end()
    })
    
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
