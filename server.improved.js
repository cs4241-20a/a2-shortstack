const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      dayjs = require('dayjs'),
      localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

var appdata = []

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
  else if( request.url === '/results') {
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata))
  }
  else if( request.url === '/result') {

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
    dataString = JSON.parse(dataString)

    if(request.url === '/delete'){
      manageData('/delete', dataString)
    }
    else if(request.url === '/edit'){
      manageData('/edit', dataString)
    }
    else {
      manageData('/submit', dataString)
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('hi')
  })
}

const manageData = function( url, data ) {
  if(url === '/submit'){
    if(data.currentPage !== "" && data.overallPage !== "") {
      const progress = (data.currentPage / data.overallPage) * 100
      data.progress = `${progress.toPrecision(2)}%`
    } else {
      data.progress = '-'
    }
    data.createdAt = dayjs().format('lll') 
    data.updatedAt = dayjs().format('lll')
    appdata.push(data)
    return 200
  }
  else if(url === '/delete'){
    appdata = appdata.filter(book => book.isbn !== data[0].isbn)
    return 200
  }

  else if(url === '/edit' ){
    if(data.currentPage !== "" && data.overallPage !== "") {
      const progress = (data.currentPage / data.overallPage) * 100
      data.progress = `${progress.toPrecision(2)}%`
    } else {
      data.progress = '-'
    }
    data.updatedAt = dayjs().format('lll') 
    appdata = appdata.filter(book => book.isbn !== data.isbn)
    appdata.push(data)
    return 200
  }
}

/** as isbn# is unique for books, we use it as the 'primary key' */
const isDuplicate = function( data ) {

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