const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// const appdata = [
//   { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
//   { 'model': 'honda', 'year': 2004, 'mpg': 30 },
//   { 'model': 'ford', 'year': 1987, 'mpg': 14}
// ]

let appdata = [];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) ;

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
};

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  });

  request.on( 'end', function() {
    const json = JSON.parse(dataString);
    // this request is an order
    if (json.type === "order") {
      console.log("obtained order");
      const orderNum = appdata.length === 0? 1 : appdata[appdata.length - 1].orderNum + 1;
      appdata.push({orderNum: orderNum, color: json.color, quantity: json.quantity})
    }
    // this request is a fulfillment
    else if (json.type === "fulfill") {
      console.log("obtained fulfillment");
      let orderNum = json.orderNum;
      console.log(orderNum);
      console.log(typeof orderNum);
      let i;
      for (i = 0; i < appdata.length; i++) {
        console.log(appdata[i].orderNum);
        if (appdata[i].orderNum.toString() === orderNum) {
          appdata = appdata.splice(0, i).concat(appdata.splice(i + 1, appdata.length));
        }
      }
    }
    else {
      // this is an invalid request
      console.log("invalid json");
    }
    console.log(appdata);
    // ... do something with the data here!!!
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(JSON.stringify(appdata));
  })
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );

     }
   })
};

server.listen( process.env.PORT || port );
