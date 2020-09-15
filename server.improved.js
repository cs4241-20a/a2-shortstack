const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { route: "test", time: 7, distance: 1, fitness: 7 },
  { route: "test", time: 14, distance: 2, fitness: 14 },
  { route: "test", time: 21, distance: 3, fitness: 21 },
];

const calculateFitness = function (record) {
  record.fitness = record.time*record.distance;
};

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  if (request.url === "/submit") {
    //if not loading just table, process new record
    let dataAsString = "";
    request.on("data", function (dataBuffer) {
      dataAsString += dataBuffer;
    });
    //parse data buffer as string

    request.on("end", function () {
      var newRecord = JSON.parse(dataAsString); //get new record json
      calculateFitness(newRecord); //calculate fitness on newRecord (field already present just null)

      appdata.push(newRecord); //put record data into "database"
    });
  }
  /*
  always send table after post
  any non "/submit" POST request just loads the table
  ex. "/load"
  */
  sendTable(response);
};

const sendTable = function (response) {
  response.writeHead(200, "OK", { "Content-Type": "text/plain" });
  response.end(JSON.stringify(appdata));
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
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
