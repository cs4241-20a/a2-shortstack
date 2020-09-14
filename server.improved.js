const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

const appdata = [
  { 'make': 'Ford', 'model': 'Bronco', 'year': 1976, 'price': 57000, 'priority': 3, 'id': 123456 },
  { 'make': 'Cadillac', 'model': 'LaSalle', 'year': 1938, 'price': 59000, 'priority': 2, 'id': 135426 },
  { 'make': 'Chevrolet', 'model': 'Camaro', 'year': 1969, 'price': 88900, 'priority': 1, 'id': 122543 }
]

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/data'){
    sendData(response)
  }
  else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataJson = null

  request.on('data', function (data) {
    let json = JSON.parse(data)

    let priority = getPriority(json.year, json.price)
    let id = getUniqueID()
    json.priority = priority
    json.id = id

    dataJson = json
  })

  request.on('end', function () {
    appdata.push(dataJson)
    sendData(response, dataJson)
  })
}

const getPriority = function (year, price) {
  let priority = 5

  if (year < 1930 && price > 45000) {
    priority = 1
  } else if (year < 1960 && price > 45000) {
    priority = 2
  }
  else if (year < 1970 && price > 45000) {
    priority = 3
  }
  else if (year < 2020 && price > 45000) {
    priority = 4
  }
  return priority
}

const getUniqueID = function () {
  return Math.random().toString().substr(2, 8)
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

const sendData = function (response, data=appdata) {
  response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
  response.write(JSON.stringify(data))
  response.end()
}

server.listen(process.env.PORT || port)
