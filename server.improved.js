const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { name: 'Kyle\'s Score', date: '2020-08-08', score: '12321', formatted_score: 'KYLE-12321' },
  { name: 'Joe\'s Score', date: '2020-08-10', score: '34029', formatted_score: 'JOE\'-34029' },
  { name: 'TJ\'s Score', date: '2020-08-18', score: '66766', formatted_score: 'TJ\'S-66766' }
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
    let newData = JSON.parse(dataString)
    console.log(newData)
    if(newData['name'] === '' || newData['date'] === '' || newData['score'] === '')
    {
      //Do nothing
    }
    else
    {
      var formattedScore = "";
      formattedScore = newData['name'].substring(0,4).toUpperCase() + "-" + newData['score']; 
      newData['formatted_score'] = formattedScore; //this is the server logic
      appdata.push(newData);
    }
    console.log(appdata);
    console.log("Logged...");

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.write(JSON.stringify(appdata));
    response.end();
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
