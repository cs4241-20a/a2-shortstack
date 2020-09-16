const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata1 = []

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function(request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function(request, response) {

    var task;

    request.on('data', function(data) {
        task = JSON.parse(data)
        appdata1.push(task)

    })

    request.on('end', function() {
        var ds = task
        const priority = ds.priority;
        const assigneddate = ds.assigneddate;

        ds.deadline = ds.assigneddate;

        for (var i = 0; i < appdata1.length; i++) {

            var parts = ds.assigneddate.split('-');
            var mydate = new Date(parts[0], parts[1] - 1, (parseInt(parts[2]) + parseInt(ds.priority)));
            ds.deadline = mydate.toDateString();
        }


        var stringDS = JSON.stringify(ds);


        appdata1[appdata1.length] = stringDS;

        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata1))
    })
}

const sendFile = function(response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function(err, content) {

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

server.listen(process.env.PORT || port)