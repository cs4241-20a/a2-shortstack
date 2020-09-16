const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [];
let maxDPS = 0.0;
let avgDPS = 0.0;
let sumDPS = 0.0;

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
    let json = JSON.parse( dataString );
    console.log(json);
    
    
    dataString = processData(json);
    
    console.log(appdata);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(dataString);
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


// Processes a piece of data in the form of a JSON string.
function processData(data){
  appdata.push(data)
  //console.log(appdata)
  console.log(data)
  
  const min = data.minutes, sec = data.seconds, name = data.fightname, dmg = data.damage;
  
  // format time into a single string
  let totalTime = (min * 60) + sec * 1; // total seconds elapsed
  let timeFormat = ":";
  
  if(!min || min === 0){
    timeFormat = "00:";
  }
  
  if(!sec){
    timeFormat += "00";
  }
  else if(sec < 10 && sec !== "00"){ 
    // add a padding zero if seconds are less than 10
    if(sec === 0 ){ // double equal signs also catch "undefined" case
      timeFormat += "0";
    }
    timeFormat += "0";
  }
  let timeString = min + timeFormat + sec;
  
  // derived fields!
  const totalDPS = dmg / totalTime; // damage per second
  sumDPS += totalDPS;
  
  if(totalDPS >= maxDPS){
    maxDPS = totalDPS;
  }
  
  avgDPS = getAvgDPS();
  
  // construct JSON to return from the server
  let newJSON = {
    fightname : name,
    duration : timeString,
    damage: dmg,
    DPS : totalDPS,
    maxDPS: maxDPS,
    avgDPS: avgDPS
  }
  newJSON = JSON.stringify(newJSON);
  
  return newJSON;
}

function getAvgDPS(){
  let avg = sumDPS / appdata.length;
  console.log("avg = " + avg);
  return avg;
}



server.listen( process.env.PORT || port )
