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
    
    // Calculating due time using start time and priority
    var oneTask = JSON.parse ( dataString );
    var endTime;
    
    // If time not entered assume start time at 12:00
    if (oneTask.startTime === ""){
      oneTask.startTime = "12:00";
    }
    
    // Adding time based on priority
    switch(parseInt(oneTask.prio)){
      case 1: endTime = addTime(oneTask.startTime,30); break;
      case 2: endTime = addTime(oneTask.startTime,60); break;
      case 3: endTime = addTime(oneTask.startTime,120); break;
      default: endTime = oneTask.startTime; break;
    }
    
    // Add due time to the object
    oneTask.endTime = endTime;
    
    // Function to transfer start time to int and add time
    // return a string of edited time
    function addTime(startTime, addMin){
      var hour = parseInt(startTime.substring(0,2));
      var min = parseInt(startTime.substring(3,5));
      if(addMin ===30){
        if(min > 30){
          min-=30;
          hour++;
        }else{
          min+=addMin;
        }
      }else if(addMin === 60){
        hour++;
      }else if(addMin === 120){
        hour+=2;
      }
      if(hour>24){
        hour = 0;
      }
      var minString, hourString;
      if(min<10){
        minString = "0" + min.toString();
      }else{
        minString = min.toString();
      }
      if(hour<10){
        hourString = "0" + hour.toString();
      }else{
        hourString = hour.toString();
      }
      return hourString.toString() + ":" + minString.toString();
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    // Return the modified object back
    response.end(JSON.stringify(oneTask))
    //response.end(JSON.stringify(appdata))
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
