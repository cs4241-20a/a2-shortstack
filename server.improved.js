const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000



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
    } else {
        sendFile(response, filename)
    }
}
let dataStorage = ['{"habit_name": "exercise", "startDate": "09/12/2020", "weeks": 4, "weekday":6, "days": [["-","-","O","X","#","#","#"],["#","#","#","#","#","#","#"],["#","#","#","#","#","#","#"],["#","#","#","#","#","#","#"]]}']

const handlePost = function (request, response) {
    if (request.url === '/submit') {
        request.on('data', function (data) {
            let newdata = JSON.parse(data)
            newdata.weekday = (new Date(newdata.startDate)).getDay()
            let days = []
            for (let i = 0; i < newdata.weeks; i++) {
                days[i] = new Array(7).fill("#")
            }
            newdata.days = days
            dataStorage.push(JSON.stringify(newdata))
        })
    } else if (request.url === '/delete') {
      request.on('data', function (data) {
          let toDelete = JSON.parse(data).habit
          dataStorage.splice(toDelete, 1)
      })

    } else if (request.url === '/edit') {
      request.on('data', function (data) {
          let newdata = JSON.parse(data)
          let newVal = ""
          if(newdata.val === "#"){
              newVal = "O"
          }else if(newdata.val === "O"){
              newVal = "X"
          }else if(newdata.val === "X"){
              newVal = "-"
          }else{
              newVal =  "#"
          }
          let habit = JSON.parse(dataStorage[newdata.habit])
          habit.days[newdata.row][newdata.col]=newVal
          dataStorage[newdata.habit] = JSON.stringify(habit)
      })
    }else{ request.on('data', function (data) {})
    }
    request.on('end', function () {
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(dataStorage))
    })
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {'Content-Type': type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHeader(404)
            response.end('404 Error: File Not Found')

        }
    })
}

server.listen(process.env.PORT || port)
