const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

let dataObj = []
let counter = dataObj.length;

const server = http.createServer( function( request,response ) {
	console.log("serve1");
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
	console.log("get");

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}
const handlePost = function( request, response ) {
  let dataString = '';
	
  request.on( 'data', function( data ) {
	  console.log(JSON.parse(data));
      dataObj.push(JSON.parse(data));
  })
console.log(request.url);
  request.on( 'end', function() {
	  console.log("end");
	let obj = dataObj[counter];
	
	dataString += JSON.stringify(obj);
	console.log(counter);
	let fail = false;
	if(obj == undefined || obj.actionID < 0 || obj.actionID == '' || obj.moveLen <= 0) {
		response.writeHead( 404, "ERR", {'Content-Type': 'text/plain' })
		response.end();
	} else {
		var found = false;
		for(var i = 0; i < dataObj.length; i++) {
			if(dataObj[i].actionID == obj.actionID && i != counter) {
				if(obj.action == 2) {
					dataObj.splice(i);
					
					counter--;
				} else if(obj.action == 1){
					
					dataString = JSON.stringify(dataObj[i]);
					dataObj[i] = obj;
				}
				found = true;
			}
		}
		if(!found)
			counter++;
		console.log("cont");
		response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
		response.end(dataString);
		console.log(counter);
	}
    // ... do something with the data here!!!
	
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 
	console.log("send");
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
