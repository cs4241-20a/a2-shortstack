const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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

let dataArray = []
let dobArray = [] 
var rAge = 0
const date = [9, 16, 2020] //fixed date for simplification purposes
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
      //let oldData = JSON.parse(data)
      let ndata = data.slice(0, (data.length - 1))
      // calculate age
      let info = JSON.parse(data)
      let dob = info.dateofbirth
      let cArray = dob.split(" ")
      for (var i = 0; i < dob.length; i++) {
        //console.log(cArray[i])
        dobArray[i] = parseInt(cArray[i])
      }
      console.log(dobArray)
      var year = date[2] - dobArray[2]
      var month = date[0] - dobArray[0]
      if (month < 0) {
        year = year-1
      }
      rAge = year
      console.log(rAge)
      let age = ', "age":"'+ parseInt(rAge) + ' years" }'
      //let age = ', "age":"10" }' 
      let newData = ndata + age
      console.log(newData)
      dataArray.push(JSON.parse(newData))
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    //console.log( dataArray )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify(dataArray))
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
