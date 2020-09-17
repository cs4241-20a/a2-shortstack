const http = require('http'),
    {parse} = require('querystring'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

let playerInfo = [];
let map = "";

const appdata = [
    {'model': 'toyota', 'year': 1999, 'mpg': 23},
    {'model': 'honda', 'year': 2004, 'mpg': 30},
    {'model': 'ford', 'year': 1987, 'mpg': 14}
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
        playerInfo = []
    } else if (request.url === '/gamedata'){
        response.writeHeader(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(playerInfo))
        response.end()
    }else {
        sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    if (request.url == '/notes') {
        request.on('data', function (data) {
            notes = JSON.parse(data)
            notes.forEach(function(n, i) {
                playerInfo[i].notes = n;
            })
        })
        response.end()
    } else if (request.url == '/startgame') {
        let dataString = ''

        request.on('data', function (data) {
            dataString += data
        })

        request.on('end', function () {
            console.log(parse(dataString))
            let data = parse(dataString)
            map = Object.keys(data)[0]
            data = Object.values(data).slice(1)
            console.log(data)
            let names = data.slice(0, data.length / 2)
            let colors = data.slice(data.length / 2)
            names.forEach((key, i) => playerInfo[i] = {
                "name": key,
                "color": colors[i],
                "notes": ""
            });
            console.log(playerInfo)
            response.write(buildGame())
            response.end()
        })
    }
}

const buildGame = function () {
    return `
  <!doctype html>
<html lang="en">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap" rel="stylesheet">
    <script src="js/game.js"></script>
    <title>CS4241 Assignment 2</title>
    <meta charset="utf-8">
</head>
<body>
<header>Among Us Companion</header>
<div id="main">
    <div id="maparea">
        <img class="map" src="images/${map.toUpperCase()}_MAP.png">
    </div>
    <div id="playerarea">
    ${playerInfo.map(value => `
        <div class="character"> 
            <img class="crew" src="images/${value.color.toUpperCase()}.png">
            <label>${value.name}</label>
            <button>dead</button>
        </div>`).join("")}
    </div>
</div>
<div id="notesarea">
    <table>
    <caption>Notes</caption>
        <tr>
            ${playerInfo.map(value => `<th>${value.name}</th>`).join("")}
        </tr>
        <tr>
         ${playerInfo.map(value => `<td><textarea>${value.notes}</textarea></td>`).join("")}
        </tr>
    </table>
</div>
</body>
</html>
`

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
            console.log(filename)
            response.end('404 Error: File Not Found')

        }
    })
}

server.listen(process.env.PORT || port)
