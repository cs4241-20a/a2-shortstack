//Special thanks to the FoodData Central API from the U.S. Department of Agriculture
//https://fdc.nal.usda.gov/api-guide.html
//There is a chance since I am using the demo key that results are not gotten but hopefully the use of this won't exceed that

const { stringify } = require('querystring')
const { type } = require('os')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      //REQUIRES ONE ADDITIONAL MODULE OF NODE-FETCH
      fetch = require("node-fetch"),
      dir  = 'public/',
      port = 3000

//Array for storing data
let appdata = []

//Base create server
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

//Base handle get
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

//Extended handle post
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

    //parse the data into json
    let data = JSON.parse( dataString );

    //if the key delete is in the data then this is a deletion request, else it is an addition
    if ("delete" in data) {
      //delete the item at the index provided
      appdata.splice(data["i"], 1);
      //Send a quick response back that things are good
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();
      console.log(appdata);
    } else {
      //URL to be used to query the api
      const qurl = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&dataType=Branded&pageSize=1&query=";
      
      //Fetch the data from the api with the food added
      fetch(qurl+data["food"])
      .then(response => response.json())
      .then(function(response) {
        //Sort through the result JSON and look for the nutrients describing calories
        //Also make sure we got an actual item back from the response
        if (response.foods.length != 0) {
          const nutrients = response.foods[0].foodNutrients;
          for (let i = 0; i < nutrients.length; i++) {
            const element = nutrients[i];
            if (element.nutrientId === 1008) {
              data["cal"] = element.value;
            }
          }
        }
        
        //If the data was not in the API then we can't find it
        if (!("cal" in data)) {
          data["cal"] = "N/A";
        }
      })
      .then(function() {
        //Add the new data to the array and write back a response with the now complete object
        appdata.push(data);
        console.log(appdata);

        response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
        response.end(JSON.stringify(data));
      })
    }
  })
}

//Base send file
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

//Hey! Listen!
server.listen( process.env.PORT || port )
