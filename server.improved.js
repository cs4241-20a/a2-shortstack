const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

var myArray = []


const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = "";
  request.on("data", function(data) {
    dataString += data;
  });

  request.on("end", function() {
  var parsed = JSON.parse(dataString); 
    
  if(parsed.size === "small" || parsed.enjoy >3){
   parsed.placement = "top shelf"
  }else if (parsed.size === "medium" || parsed.enjoy === 2){
    parsed.placement = "medium shelf"}
  else{
      parsed.placement = "bottom shelf"
 }
    myArray.push(parsed)
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    console.log(myArray)
    response.end(JSON.stringify(myArray));

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

