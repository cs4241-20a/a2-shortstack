const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'item': "Apples", 'price': "1.99", 'department': "Produce"},
  { 'item': "Milk", 'price': "2.49", 'department': "Dairy"},
  { 'item': "Frozen shrimp", 'price': "13.99", 'department': "Seafood"}
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

let dataStorage = [];
let dataIndex = 0;
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      console.log(data);
      dataStorage.push(JSON.parse(data));
  })

  request.on( 'end', function() {

    //round function found on jacklmoore.com
    function round(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    //add an additional field 'taxed' which is either the string "TAXED" or an empty string depending on if the item is taxed or not.
    //items are taxed if the category is 'other' or 'prepared'.
    //the price of these items then gets recalculated with the %6.25 Massachusetts sales tax.
    let current = dataStorage[dataIndex];
    if (current.department === "other" || current.department === "prepared"){
      current.taxed = "***TAXED***";
      current.price = current.price * 1.0625;
      current.price = round(current.price, 2);
    }else{
      current.taxed = " ";
    }

    
    current.price = round((current.price * current.amount), 2);

    if (current.priceType === "Pound"){
      //if the item is sold by the pound, add the amount of pounds at the beginning of the item's name
      current.item = (current.amount + " pounds " + current.item);
    }else{
      //if the item is sold by the each, add the number of items at the beginning of the item's name
      current.item = (current.amount + " " + current.item);
    }
    
    

    //add up all the items in the list, give the total to current.
   /* let total = 0;
    for (let i = 0; i <= dataIndex; i++){
      total += dataStorage[i].price;
    }
    current.total = total;*/

    dataString += JSON.stringify(current);

    dataIndex++;

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

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

server.listen( process.env.PORT || port )
