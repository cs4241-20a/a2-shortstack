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
  }else if ( request.url === '/db'){
    sendAppdata( response )
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
    let jsonData = JSON.parse(dataString)

    jsonData.scorePerSecond = ((jsonData.FinalScore) / (jsonData.gameLength/1000)).toPrecision(4)
    // ... do something with the data here!!!
    appdata.push(jsonData)
    console.log( appdata )
   
    sendAppdata( response )
  })
}

function sortAppdata() { // sorts the app data by the highest score
  appdata.sort(function(a, b){
    console.log(a);
    if (parseFloat(a['FinalScore'])<parseFloat(b['FinalScore'])){
      return 1;
    }
    if (parseFloat(a['FinalScore'])>parseFloat(b['FinalScore'])){
      return -1;
    }

    return 0;
  })
  

}


const sendAppdata = function(response) {
  
  sortAppdata();
  response.writeHead( 200, "Ok", {'Content-Type': 'application/json' })
  response.end(JSON.stringify(appdata, null, 3))
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
