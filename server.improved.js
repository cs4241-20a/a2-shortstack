const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  {
    name_id: "Pooja",
    orderDescription: "None",
    flower: 0,
    bouquet: 0,
    price: 0
  },
  {
    name_id: "Pooja",
    orderDescription: "Rose",
    flower: 2,
    bouquet: 0,
    price: 2
  },
  {
    name_id: "Pooja",
    orderDescription: "Tulips",
    flower: 0,
    bouquet: 20,
    price: 20
  },
  {
    name_id: "Pooja",
    orderDescription: "Orchids",
    flower: 2,
    bouquet: 20,
    price: 22
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
  } else if (request.url === "/bookings") {
    sendData(response, appdata);
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
    switch (request.url) {
      case "/submit":
        const booking = JSON.parse(dataString);

        const price = addingServices(
          parseInt(booking.flower),
          parseInt(booking.bouquet)
        );

        const newbooking = {
          name_id: booking.name_id,
          orderDescription: booking.orderDescription,
          flower: parseInt(booking.flower),
          bouquet: parseInt(booking.bouquet),
          price: price
        };

        appdata.push(newbooking);

        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end();

        break;

      case "/update":
        const bookingToUpdate = JSON.parse(dataString);

        const editedPrice = addingServices(
          parseInt(bookingToUpdate.flower),
          parseInt(bookingToUpdate.bouquet)
        );

        const updatedbooking = {
          parent_id: bookingToUpdate.parent_id,
          name_id: bookingToUpdate.name_id,
          orderDescription: bookingToUpdate.orderDescription,
          flower: parseInt(bookingToUpdate.flower),
          bouquet: parseInt(bookingToUpdate.bouquet),
          price: editedPrice
        };

        appdata.splice(bookingToUpdate.index, 1, updatedbooking);

        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end();

        break;

      case "/delete":
        const bookingToDelete = JSON.parse(dataString);
        appdata.splice(bookingToDelete.bookingNumber, 1);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end();

        break;

      default:
        response.end("404 Error: File not found");
        break;
    }
  });
};

const sendData = function(response, bookings) {
  const type = mime.getType(bookings);
  response.writeHeader(200, { "Content-Type": type });
  response.write(JSON.stringify({ data: bookings }));
  response.end();
};

const addingServices = function(wantsFlower, bigDog) {
  const baseOrderPrice = 0;
  const price = baseOrderPrice + wantsFlower + bigDog;
  return price;
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {

    if (err === null) {

      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {

      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
