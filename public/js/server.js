const http = require('http')
const fs = require('fs')
const mime = require('mime')
const googleMaps = require('@googlemaps/google-maps-services-js')
const API_KEY = 'AIzaSyAxOwuiXY34UkGYJ7Fs6CXhlcD8ftwfiMg'
const PORT = 3000

let appData = [{
    "artist_name": "Bill Evans",
    "born": "1929-08-16", "birthplace": "Plainfield, New Jersey",
    "died": "1980-09-15", "genre": "Jazz", "age": 51,
    "coords": {"lat": 40.6337136, "lng": -74.4073736}
},

    {
        "artist_name": "Frank Zappa",
        "born": "1940-12-21", "birthplace": "Baltimore, Maryland",
        "died": "1993-12-4", "genre": "Rock, Blues, Jazz...", "age": 52,
        "coords": {"lat": 39.2904, "lng": -76.6122}
    },

    {
        "artist_name": "Ella Fitzgerald",
        "born": "1917-04-25", "birthplace": "Newport News, Virginia",
        "died": "1996-06-15", "genre": "Swing, Bebop, Jazz", "age": 79,
        "coords": {"lat": 37.0870821, "lng": -76.4730122}
    },
    {
        "artist_name": "Jerry Garcia",
        "born": "1942-08-01", "birthplace": "Newport News, Virginia",
        "died": "1995-08-09", "genre": "Psychedelic rock, blues rock, folk rock,", "age": 53,
        "coords": {"lat": 37.773972, "lng": -122.431297}
    }
]


/**
 * server -simple file server
 *
 */
const server = http.createServer(function (req, res) {
    //Handle GET
    if (req.method === 'GET') {
        handleGet(req, res)
    }
    //Handle POST
    else {
        handlePost(req, res)
    }
}).listen(PORT)


/**
 * handleGet -serve GET requests
 * @param req
 * @param res
 */
function handleGet(req, res) {
    if (req.url === '/') {
        sendFile(res, 'public/index.html')
    } else {
        //Use '.' to access folder css, html, js...
        sendFile(res, 'public/' + req.url)
    }
}




/**
 * handlePost -serve POST requests
 * @param req
 * @param res
 */
function handlePost(req, res) {
    let myData = ''

    req.on('data', (data) => {
        myData += data
    })

    req.on('end', () => {

        //Convert string to JSON
        myData = JSON.parse(myData)
        //Access firs key in  JSON to so we can handle data
        let firstKey = Object.keys(myData)[0]

        //Populate table with appData when page loads
        if (firstKey === 'send_data') {
            res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
            //Send back the data
            res.end(JSON.stringify(appData))
          
          //Handle removal of appData elements
        } else if (firstKey === 'remove') {
            console.log(`removing record:${myData.remove}`)
            appData.splice(myData.remove, 1)
            res.end(JSON.stringify(appData))
          
          //Calculate derived fields and re populate table

        } else {
            //Calculate age based on two dates
            myData.age = calculateAge(myData.born, myData.died)

            //Get geocode promise from google maps,
            getGeoPromise(myData).then((geoPromise) => {
                //Get geocoded result
                let result = geoPromise.data.results[0].geometry.location
                myData.coords = {lat: result.lat, lng: result.lng}
                appData.push(myData)

                res.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                //Send back the data
                res.end(JSON.stringify(appData))
            })
        }
    })

}


/**
 * sendFile -read file and send to client
 * @param response
 * @param filename
 */
const sendFile = function (response, filename) {
    //Identify the data based on file name
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, data) {
        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            response.writeHead(200, {'Content-Type': type})
            response.end(data)


        }
        // file not found, error code 404
        response.writeHead(404)
        response.end('404 Error: File Not Found')
    })
}



/**
 * calculateAge -calculate age based on death date or current date
 * @param born
 * @param died
 * @returns {number}
 */
function calculateAge(born, died) {
    const DAYS_IN_YEAR = 365
    const SEC_TO_DAYS = 1.157407e-5

    if (died === '') {
        died = Date.now()
    }
    let ms = new Date(died) - new Date(born)
    let seconds = Math.floor(ms / 1000)
    return (seconds * SEC_TO_DAYS) / DAYS_IN_YEAR
}


const client = new googleMaps.Client({});
/**
 * getGeoPromise -return promise to geographic coordinates
 * @param myData
 * @returns {Promise<GeocodeResponse>}
 */
function getGeoPromise(myData) {
    return client.geocode({
        params: {
            address: myData.birthplace,
            key: API_KEY,
        },
        timeout: 1000, // milliseconds
    })
}
