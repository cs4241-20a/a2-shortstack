const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;
var d = new Date()
var Task1 = {type:"Sample Task", Date:d};

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  switch (request.url) {
    case "/":
      sendFile(response, "public/index.html");
      break;
    case "/public/index.html":
      sendFile(response, "public/index.html");
      break;
    case "/public/css/style.css":
      sendFile(response, "public/css/style.css");
      break;
    case "/public/js/scripts.js":
      sendFile(response, "public/js/scripts.js");
      break;
    default:
      response.end("404 Error: File Not Found");
  }
};

let taskStorage = [];
taskStorage.push(Task1);

const handlePost = function(request, response) {
  let newDate = new Date()
  
  let dataString = "";
  request.on("data", function(data) {
    //dataStorage.push(String(data));
    dataString = data;
    let newTask = {type:String(data), Date:newDate};
    taskStorage.push(newTask);
  });

  request.on("end", function() {
    //console.log( JSON.parse( dataStorage ) )

    // ... do something with the data here!!!
    if (!(dataString === "")) {
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(dataString);
    }
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
