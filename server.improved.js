const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const reviews = [];
var currentIndex = 0;


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})


const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) 
  {
    sendFile( response, 'public/index.html' )
  }
  
  else if (request.url === '/reviews') // get the reviews from server
  {
    response.writeHead(200, "OK", {'Content-Type': 'application/json'})
    response.end(JSON.stringify(reviews))  
  } 
  
  else{
    sendFile( response, filename )
  }
}


const handlePost = function( request, response ) {
  let dataString = ''

  // recieves the data from the HTTP POST
  request.on( 'data', function( data ) {
      dataString += data 
  })
  
  // prints out the data in the HTTP POST
  request.on( 'end', function() {
    var recievedData = JSON.parse(dataString);

    if (dataString.includes('delete')) {
      let index = recievedData.index;
      index = findIndexPostion(index);

      if (index !== -1) {

        reviews.splice(index, 1);
        console.log("Deleted Entry at " + recievedData.index + " Successfully!");
      }
      else {
        console.error("Index: " + recievedData.index + " Does Not Exist in Data!");
      }
    }

    else  {
      let priceRating = parseInt(recievedData.priceRating.charAt(0));
      let batteryRating = parseInt(recievedData.batteryRating.charAt(0));
      let performanceRating = parseInt(recievedData.performanceRating.charAt(0));
      let feelRating = parseInt(recievedData.feelRating.charAt(0));

      var overallRating = calculateOverallRating(priceRating, batteryRating, performanceRating, feelRating)
      
      recievedData.overallRating = overallRating
      recievedData.currentIndex = currentIndex;
      
      if (dataString.includes('index')) {
        let index = recievedData.index;
        let desiredIndex = findIndexPostion(index);

        if (index >= 0 && desiredIndex !== -1) {

          recievedData.currentIndex = index;
          reviews[desiredIndex] = recievedData;
          console.log("Modified Entry at " + index + " Sucessfully!")
        }
        
        else {
          console.error("Index: " + index + " Does Not Exist in Data!");
        }
      }

      else {
        console.log(recievedData)
        reviews.push(recievedData);
        currentIndex++;
      }
    }
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}


function findIndexPostion(index) {
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].currentIndex == index) {
      return i;
    }
  }

  return -1;
}


function calculateOverallRating(price, battery, performance, feel) {
  var overallRating = (price + battery + performance + feel) / 4;

  overallRating = overallRating.toFixed(2);

  return overallRating;
}


const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     } else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
