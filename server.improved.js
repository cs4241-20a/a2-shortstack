let dataArray = []
//var window = document.createElement('window'),

//document = window.document,


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
    dataString = JSON.parse( dataString );
    console.log(dataString);
    
     if(dataString["priority"] == "Medium Priority"){
      dataString["message"] = "Complete no later than 3 days before assigned due date";
    }else if(dataString["priority"] == "High Priority"){
      dataString["message"] = "Complete no later than 7 days before assigned due date";
    }else if(dataString["priority"] == "Low Priority"){
      dataString["message"] = "Due date = do date it's ok to wait till the last minute XD";
    }

    // ... do something with the data here!!!
    dataArray.push(dataString);
    
    console.log(dataArray)
    
    //extract date component from data chunk from the front end once you get it add 2 to it so you have a new field
    //if(dataString["priority"] == "Medium Priority"){
      //dataString["message"] = "Complete no later than 2 days before assigned due date";
    //}
    
//     for(var i = 0; i<dataArray.length; i++){
//       var document = window.document,
      
//       tableData = document.createElement('td'),
//          row = document.getElementById("myRow"),
//           x = row.insertCell(i); 
      
//           x.innerHTML = dataArray[i];
//     }

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(dataString));
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
