const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var id = 1
// Storage, storing players from highest -> lowest initiative
const appdata = [
  { 'name': 'Drathaniel', 'num': '10', 'ac': '13', 'hp': '37', 'id': 0}
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
  }
  else if(request.url === '/appData') {
    response.writeHead( 200, "OK", {'Content-Type': 'application/json'})
    response.write(JSON.stringify(appdata))
    response.end()
  
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //console.log( JSON.parse( dataString ) )

    json = JSON.parse( dataString)

    // delete
    if(json.hasOwnProperty('delete')) {
      appdata.splice(appdata.findIndex(x => x.id.toString() === json.id.toString()), 1);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.write(JSON.stringify(appdata))
      response.end()
      return false;
    }
    // move
    if(json.hasOwnProperty('movedir')) {
      var oldpos = appdata.findIndex(x => x.id.toString() === json.id.toString())
      var newpos = oldpos + parseInt(json.movedir)
      // If they try to move outside the bounds, return
      if( newpos < 0 || newpos >= appdata.length) {
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(appdata))
        response.end()
        return false;
      }

      var start = appdata[oldpos]
      var end = appdata[newpos]
      // If it would mess up order refuse
      if(parseInt(start['num']) !== parseInt(end['num'])) {
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(appdata))
        response.end()
        return false;
      }
      array_move(oldpos, newpos)
      //console.log(appdata)

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.write(JSON.stringify(appdata))
      response.end()
      return false;
    }

    json['id'] = id++
    //console.log(json)
    
    var pos = determineOrder( parseInt(json.num))

    appdata.splice(pos, 0, json)

    //console.log(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(appdata))
    response.end()
  })
}

function determineOrder  ( initiative ) {
  var i;
  for(i=0; i<appdata.length; i++) {
    if(initiative > parseInt(appdata[i].num)) {
      return i
    }
  }
  return i

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

function array_move( old_index, new_index) {
    if (new_index >= appdata.length) {
        var k = new_index - appdata.length + 1;
        while (k--) {
            appdata.push(undefined);
        }
    }
    appdata.splice(new_index, 0, appdata.splice(old_index, 1)[0]);
};

server.listen( process.env.PORT || port )
