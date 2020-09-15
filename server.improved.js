// check if the console is working and server is running
console.log("Server initialized"); 

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));

const scoreboard = [
  {name: "Mr. Insano", cps: 5, clicks: 150},
  {name: "Cui2", cps: 2, clicks: 60}
]

app.get("/", function(request, response) {
  sendFile(response, 'public/index.html')
});

app.post("/submit", function(request, response) {
  console.log("/submit received!");
  console.log(request.body);
  console.log("Name is: " + request.body.yourname);
  let json = {
    name: request.body.yourname, 
    cps: getClicksPerSecond(request.body.totalclicks), 
    clicks: request.body.totalclicks
  }
  scoreboard.push(json);
  console.log("The current scoreboard: \n" + scoreboard);
});

app.post("/delete", function(request, response) {
  //find name equal to name to delete.
  console.log(" was deleted!");
});




// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) { //if get request, handleGet()
//     handleGet( request, response )    
//   } else if( request.method === 'POST' ){ //else if post request, handlePost()
//     handlePost( request, response ) 
//   }
// })

// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 ) 

//   if( request.url === '/' ) {
//     sendFile( response, 'public/index.html' )
//   }else{
//     sendFile( response, filename )
//   }
// }

// const handlePost = function( request, response ) {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })

  // request.on( 'end', function() {
  //   console.log("Server retrieved info!");
  //   console.log(request);






  //PSUEDO CODE
    //console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    //clicks / 30 = cps
    //user(name, cps, totalclicks);
    //scoreboard.push(newscore);
    //sort by clicks
    //var highscores = scoreboard;
    //for loop for number of users:
    // highscores[i].unshift(i);

//     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//     response.end()
//   })
// }

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

//function for getting new field
function getClicksPerSecond(totalclicks) {
  return (totalclicks/30);
}

server.listen( process.env.PORT || port )
