const { stringify } = require('querystring')

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
let nextId;
const handlePost = function( request, response ) {

  request.on( 'data', function( data ) {
    let item;
    item = JSON.parse(data);

    // item.orderNumber = 1;
    //  // if the item is a new item create a unique id and an end time for it
    //  if (item.orderNumber === null) {
    //   if(nextId === null){
    //     item.orderNumber = 1;
    //     nextId = 2
    //   } else {
    //     item.orderNumber = nextId
    //     nextId++
    //   }}

    dataStorage.push(item); 
  })

  request.on( 'end', function() {
    // console.log( JSON.stringify( dataStorage ) )

    // ... do something with the data here!!!

    //get the last item pushed to datastorage
    let index = dataStorage.length - 1;
    let lastItem = dataStorage[index];

    // if the item is not a new item (has an order number), alter the fields and delete it
    if(lastItem.orderNumber !== undefined){
      // look for the item with the same order number, and alter the fields
      let i;
      for( i = 0; i < index; i++){
      
        if(dataStorage[i].orderNumber === parseInt(lastItem.orderNumber)){
          dataStorage[i].orderItem = lastItem.orderItem;
          dataStorage[i].orderDetails = lastItem.orderDetails;
        }
      }
      // delete the new item used to alter the old one
      dataStorage.splice(index, 1);

    } else {
        // give the item a unique order number
        if(nextId === undefined){
          lastItem.orderNumber = 1;
          nextId = 2
        } else {
          lastItem.orderNumber = nextId
          nextId++
        }

        // give the item an end time after its start time
        let finalCost;
        lastItem.orderCost = parseFloat(lastItem.orderCost);
        finalCost = parseFloat(lastItem.orderCost) * 1.25;
        lastItem.orderTotalCost = finalCost;
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(dataStorage))
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