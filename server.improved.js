const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { route: "Normal Run", time: 30, distance: 4, fitness: 120 },
  { route: "Workout", time: 15, distance: 2.5, fitness: 37.5 },
  { route: "Long Run", time: 60, distance: 9, fitness: 540 },
];

const sendAppData = function (response) {
  response.writeHead(200, "OK", { "Content-Type": "text/plain" });
  response.end(JSON.stringify(appdata));
};

const calculateFitness = function (record) {
  return record.time * record.distance;
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
  if (request.url === "/loadData") {
    sendAppData(response);
    return true;
  }
  let dataAsString = "";
  request.on("data", function (dataBuffer) {
    dataAsString += dataBuffer;
  });
  //parse data buffer as string
  request.on("end", function () {
    if (request.url === "/submit") {
      var newRecord = JSON.parse(dataAsString); //get new record json
      appdata.push({
        route: newRecord.route,
        time: newRecord.time,
        distance: newRecord.distance,
        fitness: calculateFitness(newRecord),
      }); //put record data into "database"
    }
    sendAppData(response);
  });
  return true;
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
