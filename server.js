const { resolve } = require("path");

const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000,
  // db related
  db_dir = "db/",
  Db = require("tingodb")().Db,
  tableify = require("tableify");

const db = new Db(db_dir, {});
// fetch a collection
const collection = db.collection("Posts");

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

function getTable() {
  return new Promise(function (resolve, reject) {
    collection.find().toArray(function (err, posts) {
      if (err) {
        return reject(err);
      }
      // transform _id.id to _id
      posts = posts.map((x) => {
        x._id = x._id.id;
        return x;
      });

      return resolve(posts);
    });
  });
}

function getPostsRequestResponse() {
  return new Promise((resolve, reject) => {
    getTable().then(
      function (posts) {
        posts_html = tableify(posts);
        msg = JSON.stringify({ posts: { html: posts_html, json: posts } });
        resolve(msg);
      },
      function (err) {
        reject(err);
      }
    );
  });
}

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/posts") {
    getPostsRequestResponse()
      .then((msg) => {
        response.end(msg);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  if (request.url === "/submit") {
    return new Promise((resolve, reject) => {
      let dataString = "";

      request.on("data", function (data) {
        dataString += data;
      });

      request
        .on("end", function () {
          data = JSON.parse(dataString);

          Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [
              this.getFullYear(),
              "/",
              (mm > 9 ? "" : "0") + mm,
              "/",
              (dd > 9 ? "" : "0") + dd,
            ].join("");
          };
          data.date = String(new Date().yyyymmdd());
          data.words = data.message.split(" ").length;

          collection.insert([data], { w: 1 }, function (err, result) {
            if (err) {
              return reject(err);
            }
            getPostsRequestResponse()
              .then((msg) => {
                response.writeHead(200, "OK", {
                  "Content-Type": "text/plain",
                });
                response.end(msg);
                resolve();
              })
              .catch((err) => {
                console.error(err);
              });
            resolve();
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  } else if (request.url === "/delete") {
    return new Promise((resolve, reject) => {
      let dataString = "";
      request.on("data", function (data) {
        dataString += data;
      });
      request
        .on("end", function () {
          data = JSON.parse(dataString);

          const myQuery = { _id: new db.ObjectID(data.id) };

          console.log(myQuery);
          collection.remove(myQuery, { w: 1 }, function (err, result) {
            if (err) {
              return reject(err);
            }
            getPostsRequestResponse()
              .then((msg) => {
                response.writeHead(200, "OK", {
                  "Content-Type": "text/plain",
                });
                response.end(msg);
                resolve();
              })
              .catch((err) => {
                console.error(err);
              });
            resolve();
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  } else if (request.url === "/edit") {
    return new Promise((resolve, reject) => {
      let dataString = "";
      request.on("data", function (data) {
        dataString += data;
      });
      request.on("end", function () {
        data = JSON.parse(dataString);

        const myQuery = { _id: new db.ObjectID(data.id) };

        updated = {
          $set: {
            title: data.title,
            message: data.message,
            isSpoiler: data.isSpoiler,
            isBug: data.isBug,
            isFluff: data.isFluff,
          },
        };
        collection
          .update(myQuery, updated, function (err, result) {
            if (err) {
              return reject(err);
            }
            getPostsRequestResponse()
              .then((msg) => {
                response.writeHead(200, "OK", {
                  "Content-Type": "text/plain",
                });
                response.end(msg);
                resolve();
              })
              .catch((err) => {
                console.error(err);
              });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });

        console.log(data);
      });
    });
  } else {
    console.log("Failed to post", request.url);
  }
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
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
