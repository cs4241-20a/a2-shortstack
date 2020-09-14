const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appData = [
  { 'name': 'frank', 'color': 'blue', 'rapname': 'Fk-Teddy bluⓔ$'},
  { 'name': 'thomas', 'color': 'green', 'rapname': 'Ts-Candy grⓔⓔn$' },
  { 'name': 'ford', 'color': 'blue', 'rapname': 'Fd-Dollaz bluⓔ$'} ,
  { 'name': 'punch', 'color': 'yellow', 'rapname': 'Ph-Bopz yellow$' },
  { 'name': 'love', 'color': 'orange', 'rapname': 'Le-Mansion orangⓔ$'} 
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
  else{
    sendFile( response, filename )
  }
}


const handlePost = function( request, response ) {

  request.on( 'data', function( data ) {
    var obj = JSON.parse(data);

      rapname(obj); // using score will rearrange appData to have correct ranking
    

    return JSON.stringify(appData);
     
  })

  request.on( 'end', function() {

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appData))
  })
}


let middle = ['Bopz', 'Nasty', 'Cake', 'Dollaz', 'Boss', 'Teddy', 'Munchkin', 'Candy','Mansion','Monsta']

const rapname = function(obj){//dervives rapper name

  const { length } = appData;
  var newColor=obj.color;
  var newName ='';

  let color = obj.color;
  let name = obj.name;
  let nameLength = name.length;

  //change any instances of 'e' to 'ⓔ'
  for (var i = 0; i < color.length; i++) {
    if((color.charAt(i)).toLowerCase()==='e' ){

      newColor = color.substr(0, i) + 'ⓔ' + color.substr(i+1);
    }

  }

  //take first and last letter of name
  for(var i = 0; i < nameLength; i++){
    if(i===0){
      newName = (name.charAt(0)).toUpperCase();
    }
    else if(i===nameLength-1 && nameLength > 1){
      newName += (name.charAt(nameLength -1)).toLowerCase();
    }
  }

  //pick a random middle part
  let randNum =Math.floor(Math.random() * 10);

  const rapname =  newName+ "-" + middle[randNum] +" " +newColor +"$";

  //add data to the server
  appData.push({name: name, color: color, rapname: rapname });
  console.log(appData[length])
  return true;

}

const sendFile = function( response, filename ) {
  //console.log(filename)
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
