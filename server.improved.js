const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
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

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
};

const getFullName = function( fName, mName, lName) {
  return fName + " " + mName + " " + lName;
};

const getDrinkingValidity = function (birthday) {
  let birthdayComponents = birthday.split("-");
  let birthDate = new Date(birthdayComponents[0], birthdayComponents[1], birthdayComponents[2]);
  let ageDifMs = Date.now() - birthDate.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch

  let ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);

  return ageYears >= 21;
};

//global dataset of guests and their attributes
let guests = [];

const handlePost = function( request, response ) {
  let returnJson = null;

  request.on('data', function (data) {
    //parse the received data into a JSON object
    let recv = JSON.parse(data);
    if (recv['removeElement'] === -1) {
      //calculate the full name of the individual to a single string
      let fullName = getFullName(recv['firstName'], recv['middleName'], recv['lastName']);

      //calculate whether they are able to drink at this party
      let ableToDrink = getDrinkingValidity(recv['birthday']);

      //construct the json that is going to be returned
      returnJson = {
        fullName: fullName,
        gender: recv['gender'],
        birthday: recv['birthday'],
        ableToDrink: ableToDrink
      };

      //add the json to a list
      guests.push(returnJson);
    }
    else {
      let deleteValue = parseInt(recv["removeElement"]);
      let newArr = [];
      for (let i = 0; i < guests.length; i++) {
        if (deleteValue !== i) {
          newArr.push(guests[i]);
        }
      }
      guests=newArr;
    }
  });

  request.on('end', function () {
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(guests));
  });
};


const sendFile = function( response, filename ) {
  const type = mime.getType( filename );

  fs.readFile( filename, function( err, content ) {

    // if the error = null, then we've loaded the file successfully
    if( err === null ) {

      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': type });
      response.end( content )

    }else{

      // file not found, error code 404
      response.writeHeader( 404 );
      response.end( '404 Error: File Not Found' )

    }
  })
};

server.listen( process.env.PORT || port );