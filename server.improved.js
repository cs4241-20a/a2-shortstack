const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
})

var resultsArray = [];
var counter = 0;
var returnPainting;
var max;
var x;
var beach = 0;
var lake = 0;
var waterfall = 0;
var spring = 0;
let dataStorage = [];

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
}


const handlePost = function(request, response) {
  request.on("data", function(data) {
    dataStorage.push(JSON.parse(data));
  });
  
  beach = 0;
  lake = 0;
  waterfall = 0;
  spring = 0;

  request.on("end", function() {
    //console.log(JSON.parse(dataStorage));

    for (x = 0; x < dataStorage.length; x++) {
      switch (dataStorage[counter].yourname.length % 2) {
        case 0:
          console.log("got even");
          beach++;
          lake++;
          break;
        default:
          waterfall++;
          spring++;
      }
      switch (dataStorage[counter].color) {
        case "ivory":
          console.log("got ivory");
          beach++;
          break;
        case "mauve":
          spring++;
          break;
        case "cobalt":
          waterfall++;
          break;
        default:
          lake++;
      }
      switch (dataStorage[counter].quote) {
        case "q1":
          waterfall++;
          break;
        case "q2":
          beach++;
          break;
        case "q3":
          spring++;
          break;
        default:
          lake++;
      }
      switch (dataStorage[counter].place) {
        case "mountain":
          lake++;
          break;
        case "ocean":
          beach++;
          break;
        case "forest":
          spring++;
          break;
        default:
          waterfall++;
      }
      switch (dataStorage[counter].season) {
        case "winter":
          lake++;
          break;
        case "fall":
          waterfall++;
          break;
        case "spring":
          spring++;
          break;
        case "summer":
          beach++;
          break;
      }
    }

    resultsArray = [beach, lake, waterfall, spring];
    console.log(resultsArray);
    returnPainting = "";
    max = 0;
    for (let i = 0; i < resultsArray.length; i++) {
      if (resultsArray[i] >= max) {
        max = resultsArray[i];
        console.log(resultsArray[i]);
        if (i === 0) {
          returnPainting = "beach";
        } else if (i === 1) {
          returnPainting = "lake";
        } else if (i === 2) {
          returnPainting = "waterfall";
        } else {
          returnPainting = "spring";
        }
      }
    }

    dataStorage[counter].result = returnPainting;
    console.log(dataStorage[counter].result);

    counter++;

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(dataStorage));
  });
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
