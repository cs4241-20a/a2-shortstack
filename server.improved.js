const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'make': 'Bugatti', 'model': 'Veyron', 'year': 2005, 'price': 1200000, 'mpg': 15 },
  { 'make': 'Lamborghini', 'model': 'Aventador', 'year': 2011, 'price': 300000,'mpg': 12 },
  { 'make': 'Ferrari', 'model': '458', 'year': 2009, 'price': 175000, 'mpg': 14} 
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

  switch(request.url) {
    case('/'):
      sendFile( response, 'public/index.html' );
      break;
    
    case('/results/'):
      response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
      response.write( JSON.stringify( appdata ) );
      response.end();
      break;
    
    case('/images/bugatti.jpg'):
      sendImage( response,  'bugatti');
      break;
    
    case('/images/lamborghini.jpg'):
      sendImage( response, 'lamborghini');
      break;
    
    case('/images/ferrari.jpg'):
      sendImage( response, 'ferrari');
      break;

    case('/images/koenigsegg.jpg'):
      sendImage( response, 'koenigsegg');
      break;
    
    case('/images/mclaren.jpg'):
      sendImage( response, 'mclaren' );
      break;

    default:
      sendFile( response, filename)

  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let car = JSON.parse(dataString)

    // Calculate expected price

    // Base price. Bugatti and Koenigsegg are waaay more expensive than others.
    let price = 250000;
    if(car.make == "Bugatti" || car.make == "Koenigsegg") {
      price = 1000000;
    }

    // Appreciation/depreciation with age. New cars depreciate for a few years, then begin to appreciate.
    let age = 2021 - parseInt(car.year);

    // Wacky equation I came up with that decreases at first, but then increases to maximum value for cars from 1970 (50 years old).
    price = price + price * age * Math.sin(2 * Math.PI * age / 65 - Math.PI) / 100;

    car.price = Math.trunc(price);
    console.log(car);
    appdata.push(car);

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.write(JSON.stringify(appdata));
    response.end()
  })
}

// Helper method to make sending images sliightly less tedious
const sendImage = function( response, imgname ) {
  sendFile( response, `public/img/${imgname}.jpg`);
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
