const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let userNum = -1;

let appdata = [
  {
    id: "john doe",
    movies: [
      { title: "scott pilgrim", rating: 5 },
      { title: "the last jedi", rating: 2 }
    ]
  }
];

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
    let jsonData = JSON.parse(dataString);
    //console.log(JSON.parse(dataString));
    // ... do something with the data here!!!

    let user = jsonData.id;
    let pw = jsonData.pw;
    let data = jsonData.data;
    let workingList = [];
    let userNum = appdata.length;

    for (let i = 0; i < appdata.length; i++) {
      if (user === appdata[i].id) {
        if (pw === appdata[i].pw) {
          workingList = appdata[i].movies;
          userNum = i;
        } else if ((pw = "")) {
          workingList = appdata[i].movies;
          userNum = i;
        } else {
          user = user + Math.round(Math.random() * 10).toString(10);
        }
        break;
      }
    }

    if (pw != "") {
      if (userNum === appdata.length) {
        appdata[userNum] = { id: user, pw: pw, movies: [] };
      }

      if (data.title != "") {
        let duplicate = false;
        for (let i = 0; i < workingList.length; i++) {
          if (data.title === workingList[i].title) {
            duplicate = true;
            workingList[i].rating = data.rating;
          }
        }

        if (!duplicate) {
          workingList.push(data);
        }

        workingList.sort(function(a, b) {
          return b.rating - a.rating;
        });

        appdata[userNum].movies = workingList;
        //console.log(appdata[userNum].movies);
      }
    }

    let content = JSON.stringify(appdata[userNum]);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(content);

    console.log(appdata);
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
