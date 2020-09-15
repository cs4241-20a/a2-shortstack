const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

// {'miles': 3, 'mph': 20.8, 'notes': 'That was tough man...', 'id': 5012, 'caloriesBurnt': 500},
// {'miles': 6, 'mph': 14.8, 'notes': 'Refreshing', 'id': 4320, 'caloriesBurnt': 600},

let appdata = []

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
    } else if (request.url === 'css/style.css') {
        sendFile(response, 'public/css/style.css')
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function (request, response) {

    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {

        let responseBody = '';

        let requestDataObj = JSON.parse(dataString);

        if (request.url === '/add') {
            responseBody = handleAddNewEntry(requestDataObj)
        } else if (request.url === '/update') {
            responseBody = handleUpdateEntry(requestDataObj);
        } else if (request.url === '/delete') {
            responseBody = handleDeleteEntry(requestDataObj)
        }

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.write(responseBody)
        response.end()
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


const handleUpdateEntry = (updatedEntry) => {

    let updated = false;

    for (let i = 0; i < appdata.length; i++) {
        if (parseInt(appdata[i].id) === parseInt(updatedEntry.id)) {
            calculateCalories(updatedEntry);
            appdata[i] = updatedEntry;
            updated = true
        }
    }

    if (updated) {
        return JSON.stringify(updatedEntry);
    } else {
        return JSON.stringify({});
    }
};

const handleAddNewEntry = (newEntry) => {
    newEntry.id = generateUniqueId();
    // random formula
    calculateCalories(newEntry);
    appdata.push(newEntry);

    return JSON.stringify(newEntry)
}

const handleDeleteEntry = (entryIdObj) => {
    let id = parseInt(entryIdObj.id);

    let deleted = false;

    appdata = appdata.filter((dataEntry) => {
        if (parseInt(dataEntry.id) !== id) {
            return true;
        } else {
            deleted = true;
            return false;
        }
    })

    if (deleted) {
        return JSON.stringify(entryIdObj);
    } else {
        return JSON.stringify({});
    }
}

const calculateCalories = (entry) => {
    entry.caloriesBurnt = entry.miles * 100 + entry.mph * 2;
}


const generateUniqueId = () => {
    while (true) {
        let id = Math.floor(1000 + Math.random() * 9000);

        let exists = false
        // check if such id exists already
        appdata.forEach((dataEntry) => {
            if (dataEntry.id === id) {
                exists = true;
            }
        })

        if (!exists) {
            return id;
        }
    }
}
