const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

//data Array
let appdata = [ ];

//Make server
const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    console.log("handleget go");
    handleGet(request, response);
    console.log("handleget passed");
  } else if (request.method === "POST") {
    console.log("handlepost go");
    handlePost(request, response);
    console.log("handlepost passed");
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
    console.log("file sent");
  } else {
    sendFile(response, filename);
    console.log("file 2 sent");
  }
};


//let dataStorage = []
//Deal with response awnser
const handlePost = function(request, response) {
  //let dataStorage = [{Task: ""}, {Date: ""}, {"mdate":""}, {comp: ""}];
  let dataStorage = {
    Task:"",
    Date:"",
    mdate:"",
    comp:""
  }
  
  console.log("start handlePost");


  request.on("data", function(data) {
    const __data = JSON.parse(data.toString())
    dataStorage.Task = __data.gettask
    dataStorage.Date = __data.getdue
    let date_ob = new Date()
    let cdate = (date_ob.getMonth() + "/" + date_ob.getDate() + "/" + date_ob.getFullYear())
    dataStorage.mdate = cdate
    //dataStorage.push(  );
    //console.log( "DATA STORAGE:", data.toJSON(), JSON.parse(data.toString())  )
  });

  request.on("end", function() {
    /* 
    //let data = JSON.parse(dataString); //parse data (string) to json
    let data = JSON.stringify(dataStorage); //stringify dataStorage(array) to json
    console.log(data);
    //let data; // hold stringify dataStorage(array) to json

    //if ('delete' in data) {
    if (data.search("delete") != -1) {
      //data = JSON.stringify(dataStorage); //stringify dataStorage(array) to json
      //delet request at indexe
      appdata.splice(data["i"], 1);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" }); //log check up
      response.end();
      console.log(appdata);
    } else { 
    */
      // else add to list

      // add curent time to datemade.
      // new Date object
      //let date_ob = new Date();

      // current date
      // adjust 0 before single digit date
      //let cdate = ("0" + date_ob.getDate()).slice(-2); //("0" + date_ob.getDate());
      /*let cdate = (date_ob.getMonth() + "/" + date_ob.getDate() + "/" + date_ob.getFullYear())
      dataStorage[2]["mdate"] = cdate;
      data = JSON.stringify(dataStorage); //stringify dataStorage(array) to json
      console.log(data);*/

      //Add the new data to the array and write back
      appdata.push(dataStorage);
      console.log(appdata);
      

      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      response.end( JSON.stringify( dataStorage ) );
      //response.end();
    //}
  });
};

const sendFile = function(response, filename) {
  console.log("start sendFile");
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
