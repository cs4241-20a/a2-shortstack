const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


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
let dataStorage = [],
idCounter = 0
const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //beautiful one-liner below handles what happens when something needs to be deleted from the server's DB
    if(dataString.slice(0,3)=='DEL') for(let i=0; i<dataStorage.length; i++) {if(dataStorage[i].ID == dataString.substring(3)) dataStorage.splice(i, 1)}
    else if(dataString!='GET') {
    
    const latestEntry = JSON.parse( dataString )
    if(latestEntry.hasOwnProperty('ID')) {
      let i
      for (i = 0; i<dataStorage.length; i++) {
        if (dataStorage[i].ID == latestEntry.ID) {
          dataStorage[i].personname = latestEntry.personname
          dataStorage[i].personbirthday = latestEntry.personbirthday
          dataStorage[i].remindertime = latestEntry.remindertime
          dataStorage[i].personage = latestEntry.personage
          break
        }
      }
    } else {
      const date = new Date(),
      month = date.getMonth(),
      day = date.getDate(),
      year = date.getFullYear(),
      bmonth = latestEntry.personbirthday.slice(0,2),
      bday = latestEntry.personbirthday.slice(3,5),
      byear = latestEntry.personbirthday.slice(6,10)
      let age = year - byear
      if (month < bmonth) age--
      else if(month == bmonth && day < bday) age--
      latestEntry.personage = age
      latestEntry.ID = idCounter++ //this is used for keeping track of the element for editing and deleting purposes.
      dataStorage.push(latestEntry)
    }

  }
    // ... do something with the data here!!!
    console.log(dataStorage)
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
