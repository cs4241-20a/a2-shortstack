// server -----------------------------------------------------------

const http = require( 'http' ),
fs   = require( 'fs' ),
mime = require( 'mime' ),
dir  = 'public/',
port = 3000;

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

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
};

server.listen( process.env.PORT || port )


// Example Data -----------------------------------------------------
const tabularBack = [
{'name': 'Nicole Conill', 'bikenumber': 13, 'bikebrand': 'KTM', 'class':'female', 'fee': 35}
];


// Send Data, Add/Delete/Edit Rows ----------------------------------
const sendData = function(response, dataset) {
  const type = mime.getType(dataset);
  response.writeHead(200, {'Content-Type': type});
  response.write(JSON.stringify(dataset));
  response.end()
};

const calculateFee = function(row) {
  let fee = 0;
  fee = fee + 35;
  return fee;
};

const addRow = function (str) {
  let json = JSON.parse(str);
  tabularBack.push(json);

  for (let i = 0; i < tabularBack.length-1; i++) {
    let row = tabularBack[i];
    row['fee'] = calculateFee(row);
  }
};

const deleteRow = function (str) {
  for (let i = 0; i < tabularBack.length; i++) {
    if ((i+1).toString() === str[4]) tabularBack.splice(i,1);
  }
};

const editRow = function (str) {
  let json = JSON.parse(str);
  for (let i = 0; i < tabularBack.length; i++) {
    if ((i+1).toString() === json['modifyIndex']) {
      let row = tabularBack[i];
      row['name'] = json['name'];
      row['bikenumber'] = json['bikenumber'];
      row['bikebrand'] = json['bikebrand'];
      row['class'] = json['class'];
      row['fee'] = calculateFee(row);
    }
  }
};


// handleGet & handlePost -------------------------------------------
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/refresh') {
    sendData(response, tabularBack);
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
    dataString += data 
  });

  request.on( 'end', function() {
    if (request.url === '/add') {
      addRow(dataString);
    } else if (request.url === '/delete') {
      deleteRow(dataString);
    } else if (request.url === '/edit') {
      editRow(dataString);
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}
// ------------------------------------------------------------------