//require dependencies
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//initialize list to store json items
var appdata = []

//create the server, handle incoming requests
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

//handle GET requests
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) { //open homepage
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/fetchItems') { //get the list items from server
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(appdata))
    response.end()
  }else{
    sendFile( response, filename )
  }
}

//send an html file
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

//handle POST requests
const handlePost = function( request, response ) {
  //recieve the data
  let dataString = ''
  request.on('data', function(data) {
    dataString += data;
  })
  //parse data into JSON
  request.on('end', function() {
    var postItem = JSON.parse(dataString);
  
  //handle different types of POST requests
  if (request.url === '/addItem') { //add an item to the server
    //server logic for derived fields
    var newSubtotal = calculateSubtotal(postItem.unitprice, postItem.quantity);
    postItem.subtotal = newSubtotal;
    postItem.tax = calculateTax(newSubtotal);
    postItem.id = createRandomId();
    appdata.push(postItem);
  } else if (request.url === '/updateItem') {
    updateItem(postItem.previousName, postItem.id, postItem.name, postItem.unitprice, postItem.quantity);
  } else if (request.url === '/deleteItem') {
    deleteItem(postItem.itemname, postItem.id);
  }
  })
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
}

//subtotal = unitprice * quantity
function calculateSubtotal(unitprice, quantity) {
  return unitprice * quantity;
}

//tax = subtotal * 0.0625 (using MA tax rate)
function calculateTax(subtotal) {
  return subtotal * 0.0625;
}

//id is a randomized string to distinguish potential duplicate elements
function createRandomId() {
  var idLength = 10;
  var id = "";
  var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = chars.length;
  for (var i = 0; i < idLength; i++) {
    id += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
}

//update specific item in appdata with edited fields
const updateItem = function(prevName, id, newName, unitprice, quantity) {
  for (var i=0; i<appdata.length; i++) {
    var thisItem = appdata[i];
    if (thisItem.id == id && thisItem.itemname == prevName) {
      thisItem.itemname = newName;
      thisItem.unitprice = unitprice;
      thisItem.quantity = quantity;
      var newSubtotal = calculateSubtotal(thisItem.unitprice, thisItem.quantity);
      thisItem.subtotal = newSubtotal;
      thisItem.tax = calculateTax(newSubtotal);
    }
  }
}

//delete specific item from appdata
const deleteItem = function(name, id) {
  appdata = appdata.filter(function(item) {
    return !(item.itemname == name && item.id == id);
  })
}

//listen for requests
server.listen( process.env.PORT || port )