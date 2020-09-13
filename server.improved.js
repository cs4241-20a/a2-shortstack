const http = require( 'http' ),
      fs   = require( 'fs' ),
       IMPORTANT: you must run `npm install` in the directory for this assignment
       to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var myArray = [
        { 'foodname': 'broccoli', 'datebought': "September 9, 2020", 'enjoy' : 5, 'size': 'small', 'placement': 'top shelf'},
        { 'foodname': 'spinach', 'datebought': "September 4, 2020",   'enjoy' : 2, 'size': 'large', 'placement': 'middle shelf'},
        { 'foodname': 'cookies', 'datebought': "September 1, 2020",  'enjoy' : 5, 'size': 'medium', 'placement': 'bottom shelf'},
        { 'foodname': 'honey', 'datebought': "September 1, 2020",  'enjoy' : 5, 'size': 'small', 'placement': 'middle shelf'},
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

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    const handleFormSubmit = (event) => {
      // Stop the form from submitting since we’re handling that with AJAX.
      event.preventDefault();
      // TODO: Call our function to get the form data.
      var x = 4
      var foodname = document.getElementById("foodname").value
      var datebought =document.getElementById("purchased").value
      var enjoy =document.getElementById("enjoyability").value
      var size = document.getElementById("size").value
      function placement(){
      if(size === "small" || enjoy >3){
        return "top shelf"
        }
        if(size === "medium" && enjoy === 2){
        return "middle shelf"
        }
        else{
          return "bottom shelf"
        }
      }
      
      const data = {
          foodname,
          datebought,
          enjoy,
          size,
          placement: placement(),
          dateuseby: "bruh"
      }
      myArray.push(data);
      console.warn('added', {myArray});
     let pre = document.querySelector('#msg pre');
      var table = document.getElementById('myTable');
      if((document.getElementById("size").value === "small") && ((document.getElementById("enjoyability").value)>3))
      {
        myArray[i].placement = "top shelf";
      }
      
          for (var i = myArray.length-1; i < myArray.length; i++){
           //var checkoutDate = new Date();    // Thu Jul 21 2016 10:05:13 GMT-0400 (EDT)
            //checkoutDate.setDate(myArray[i].datebought.getDate() + 5 );
             
            var row = `<tr>
                              <td>${myArray[i].foodname}</td>
                              <td>${myArray[i].datebought}</td>
                              <td>${myArray[i].enjoy}</td>
                              <td>${myArray[i].size}</td>
                              <td>${myArray[i].placement}</td>
                              <td>${myArray[i].datetouse}</td>
                        </tr>`
              table.innerHTML += row
          }
  
  
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', handleFormSubmit);
    document.getElementById('btn').addEventListener('click', buildTable(myArray));


});
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
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
