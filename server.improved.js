const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

var appdata = [];

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
    if (request.url == "/reset") {
      appdata = [];
    } else if (request.url == "/newUser") {
      appdata.push(data);
    } else if (request.url == "/update") {
      var match = false;
      var status = 0;
      var debug = "";
      var index = 0;
      for (const entry of appdata) {
        var entryjson = JSON.parse(entry); //can access elements with .elementName
        var datajson = JSON.parse(data);
        if (entryjson.userName == datajson.userName && entryjson.userPassword == datajson.userPassword) {
          match = true;
          debug += "Contact - " + datajson.userContact + " - ";
          for (const header of Object.keys(entryjson)) {
            debug += header + " - " + entryjson[header] + " : " + datajson[header] + " ``` ";
            //go through symptoms
            if(!["userName", "userID", "userPassword", "userTemp", "userContact", "userPositive"].includes(header)) {
              if (datajson[header] == 1 && entryjson[header] == datajson[header]) {
                status = 1;
              } else if (datajson[header] == 1) {
                status = 2;
                break;
              }
            }
          }
          if(datajson.userContact || datajson.userPositive) {
            status = 2;
          }
          if(Number(entryjson.userTemp) + 2 <= Number(datajson.userTemp)) {
            status = 2;
          }
          entryjson.userStatus = status;
          appdata[index] = JSON.stringify(entryjson);
          break;
          //user has been found
        }
        index++;
      }
      // appdata.push('{"matching" : "' + match + '"}');
      // appdata.push('{"status" : "' + status + '"}');
      // appdata.push('{"debug" : "' + debug + '"}');
    }
    // appdata.push('{"url" : "' + request.url + '"}');
  });

  request.on("end", function() {
    // console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(String(appdata));
    response.end();
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
