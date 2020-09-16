const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

const scoreboard = [
  { name: "Mr. Insano", cps: 5, clicks: 150, seconds: 30, time: 7987989869},
  { name: "Cui2", cps: 2, clicks: 60, seconds: 30, time: 7987097986986}
]

const server = http.createServer(function (request, response) {
  //console.log("Creating server..", response.method);
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    console.log("Post detected");
    handlePost(request, response) //handle POST from webpage to server
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  switch(request.url) {
    case '/':
      sendFile(response, 'public/index.html');
      break;
    
    case '/data':
      //data request
      break;
    
    default:
      sendFile(response, filename);
      break;
  }
}

const handlePost = function (request, response) {
  console.log("Post received");
  let dataString = '';

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    switch (request.url) {
      case '/submit':
        let userScore = JSON.parse(dataString); //parse passed in data to be read
        let cps = Math.round((parseInt(userScore.clicks) / userScore.seconds) * 10) / 10; //get clicks per second by dividing total clicks by 30 seconds.
        let newUser = {
          "name": userScore.name,
          "cps": cps,
          "clicks": userScore.clicks,
          "seconds": userScore.seconds,
          "time": Date.now()
        }

        scoreboard.push(newUser);


        console.log("New user recorded: \n" + newUser);
        console.log("Sending new scoreboard: \n" + JSON.stringify(scoreboard));

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end(JSON.stringify(scoreboard));
        break;

      case '/delete':
        //delete user with name from scoreboard list.
        break;

      case '/modify':
        //change clicks
        break;
    }
  })
};


const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

server.listen(process.env.PORT || port)