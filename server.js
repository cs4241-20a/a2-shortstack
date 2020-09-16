const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      dbLocation = dir + 'assets/cats.json',
      indexFile = dir + 'index.html'

//Enabling Use-Strict Mode
'use-strict'

//Initializing Cache
const memoizedFs = (response) => {
  let cache = {};
  return (fileName) => {
    //TODO: Check for cat image
    const type = mime.getType(fileName) 
    if(fileName in cache) {
      let fileString = cache[fileName]
      if(!!response){
        response.writeHeader( 200, { 'Content-Type': type })
        response.end(fileString)
      }
    }
    fs.readFile(fileName, (err, fileContent) => {
      if(err){
        if(!!response){
          response.writeHeader( 404 )
          response.end( '404 Error: File Not Found' )
        }
        else{
          console.log(err);
          console.error("Loaded a private file incorrectly")
        }
      }
      else {
        cache[fileName] = fileContent
        if(!!response) {
          response.writeHeader( 200, { 'Content-Type': type })
          response.end(fileContent);
        }
      }
    });
  }
}

const sendCacheFile = (response, fileName) => {
  memoizedFs(response)(fileName);
}

const loadCacheFile = (fileName) => {
  memoizedFs()(fileName);
}

//Preliminary Loading of DB
loadCacheFile(dbLocation)
loadCacheFile(indexFile)

const server = http.createServer( function( request,response ) {
  if(request.url.includes('api')){
    readAPICall(request, response);
  }
  else if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const readAPICall = function(request, response) {
  const apiInformation = request.url.slice(1).split('/').slice(1)
  const apiCall = apiInformation[0]
  switch(apiCall) {
    case "cats":
      sendCacheFile(response, dbLocation)      
      break;
    case "updateCat":
      //Patch Request
    case "deleteCat":
      //Post
    case "newCat":
      //Post
    default:
      response.writeHead( 403, "Forbidden", {'Content-Type': 'application/json' })
      response.end(JSON.stringify({error: "Not a valid API call"}))
      break;
  }
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) {
    sendCacheFile( response, indexFile )
  } else{
    sendCacheFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

server.listen( process.env.PORT || port )