const http = require( 'http' ),
fs   = require( 'fs' ),
// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library used in the following line of code
mime = require( 'mime' ),
moment = require('moment'),
dir  = 'public/',
port = 3000

var id = 1; // will be used to add unique id to each JSON data object

const appdata = [
  {'courseName': 'CS4241 - Webware', 'task': 'Assignment 2 - TODO List', 'dueDate': '2020-09-16T23:59', 'effort' : '4', 'priority' : 'Completed!!!', 'id' : '1'}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }
  else if( request.method === 'POST' ){
    handlePost( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  // send the appdata when asked
  else if (request.url === '/appData'){
    response.writeHead(200, "OK", {'Content-Type': 'application/json'})
    response.write(JSON.stringify(appdata));
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
    var postedData = JSON.parse(dataString); // the data recieved from a post

    // check if the post JSON object contains a deletion request
    if(postedData.hasOwnProperty('delete')){

      //find the correct JSON object in appdata via the unique id and then remove that index to delete the proper data
      appdata.splice(appdata.findIndex(x => x.id.toString() === postedData.id.toString()), 1);
      response.writeHead(200, "OK", {'Content-Type': 'application/json'})
      response.write(JSON.stringify(appdata));
      response.end();
      return false;
    }

    // we are not deleting, so add the priority field and calculate its value
    var priority = calculatePriority(postedData.dueDate, postedData.effort);
    postedData.priority = priority;

    // assign the data an id for deletion refrence
    id++;
    postedData.id = id;

    // calculates the priority based off hard coded inputs (number of days before due and effort determines the priority)
    function calculatePriority (dueDate, effort) {
      var inputDate = new Date(moment(dueDate).format("MM/DD/YYYY"));
      var now = new Date(moment().format("MM/DD/YYYY"));
      var daysBeforeDue = (inputDate.getTime() - now.getTime()) / (1000 * 3600 * 24);

      if(daysBeforeDue >= 14) return "Low";
      if(daysBeforeDue >= 7 && (effort == '1' || effort == '2')) return "Low";
      if(daysBeforeDue >= 7 && effort == '3') return "Medium-Low";
      if(daysBeforeDue >= 7 && effort == '4') return "Medium";
      if(daysBeforeDue >= 7 && effort == '5') return "Medium-High";
      if(daysBeforeDue < 0) return "PAST DUE";
      if(daysBeforeDue == 0 && effort == '5') return "I'm So Screwed";
      if(daysBeforeDue == 0) return "High";
      if((daysBeforeDue == 1) && (effort == '5' || effort == '4')) return "High";
      if((daysBeforeDue == 1) && (effort == '3' || effort == '2' || effort == '1')) return "Medium-High";
      if((daysBeforeDue == 2) && (effort == '5' || effort == '4')) return "High";
      if((daysBeforeDue == 2) && (effort == '3')) return "Medium-High";
      if((daysBeforeDue == 2) && (effort == '2' || effort == '1')) return "Medium";
      if(daysBeforeDue == 3 && (effort == '5' || effort == '4')) return "High";
      if(daysBeforeDue == 3 && (effort == '3' || effort == '2')) return "Medium";
      if(daysBeforeDue == 3 && (effort == '1')) return "Medium-Low";
      if((daysBeforeDue == 4 || daysBeforeDue == 5) && (effort == '5')) return "High";
      if((daysBeforeDue == 4 || daysBeforeDue == 5) && (effort == '4')) return "Medium-High";
      if((daysBeforeDue == 4 || daysBeforeDue == 5) && (effort == '3')) return "Medium";
      if((daysBeforeDue == 4 || daysBeforeDue == 5) && (effort == '2')) return "Medium-Low";
      if((daysBeforeDue == 4 || daysBeforeDue == 5) && (effort == '1')) return "Low";
      if(daysBeforeDue == 6 && (effort == '5' || effort == '4')) return "Medium-High";
      if(daysBeforeDue == 6 && (effort == '3' || effort == '2')) return "Medium-low";
      if(daysBeforeDue == 6 && (effort == '1')) return "Low";
      else return "Cannot Decide"
    }

    appdata.push(postedData);
    response.writeHead(200, "OK", {'Content-Type': 'application/json'})
    response.write(JSON.stringify(appdata));
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
