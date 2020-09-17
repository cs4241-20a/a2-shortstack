const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//Format: { "id": 0, "kills": 0, "assists": 0, "deaths": 0, "kd_ratio": 0, "ad_ratio": 0 },
let appdata = [];
const DECIMAL_PRECISION = 2;

let id = 1;//Unique IDs to indicate rows to modify or delete
let numEntries = 0;//Length of appdata

//Track running totals and averages of all three main stats
let totalKills = 0;
let totalAssists = 0;
let totalDeaths = 0;
let avgKills = 0;
let avgAssists = 0;
let avgDeaths = 0;

/**
 * Create the HTTP server and set the request handler to send GET
 * and POST requests to their respective handlers.
 *
 * @type {Server} the HTTP server that will respond to all requests.
 */
const server = http.createServer( function( request,response ) {
    if(request.method === "GET") {
        handleGet(request, response);
    }else if(request.method === "POST"){
        handlePost(request, response);
    }
})

/**
 * Handle the HTTP GET request stored in <b>request</b> and stores the
 * HTTP response in <b>response</b>.
 *
 * @param request the HTTP GET request to be processed
 * @param response the HTTP response to store all response data in
 */
const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if(request.url === "/") {
        sendFile(response, "public/index.html");
    }else if(request.url === "/results"){
        sendTable(response);
    }else if(request.url === "/csv"){
        sendCSV(response);
    }else if(request.url === "/clear"){
        clearStats(response);
    }else{
        sendFile(response, filename);
    }
}

/**
 * Handle the HTTP POST request stored in <b>request</b> and stores the
 * HTTP response in <b>response</b>.
 *
 * @param request the HTTP POST request to be processed
 * @param response the HTTP response to store all response data in
 */
const handlePost = function( request, response ) {
    let dataString = '';

    request.on( 'data', function( data ) {
        dataString += data;
    })

    request.on( 'end', function() {
        let data = JSON.parse(dataString);
        //Convert everything to a Number now so all operations
        //dont have to keep calling Number()
        convertDataToNum(data);
        console.log(data);

        //Call the proper function based on API call, then
        //send the updated table information in response so
        // index.html can display the updated table.
        if(request.url === "/add") {
            if(addItem(data)) {
                sendTable(response)
            }else{
                response.writeHead(400, "Add request failed", {'Content-Type': 'text/plain'});
                response.end();
            }

        }else if(request.url === "/modify"){
            if(modifyItem(data)) {
                sendTable(response);
            }else{
                response.writeHead(400, "Modify request failed", {'Content-Type': 'text/plain'});
                response.end();
            }

        }else if(request.url === "/delete"){
            if(deleteItem(data))
                sendTable(response);
            else{
                response.writeHead(400, "Delete request failed", {'Content-Type': 'text/plain'});
                response.end();
            }

        }else{
            //Not recognized
            response.writeHead(401, "Invalid request type", {'Content-Type': 'text/plain'});
            response.end();
        }
    })
}

/**
 * Converts the stats given in the HTTP request to Numbers, and stores
 * them back into <b>data</b>.
 *
 * @param data an object containing any of the following fields from the
 *     the HTTP request: "id", "kills", "assists", and "deaths" fields
 */
const convertDataToNum = function(data){
    if(data.hasOwnProperty("id"))
        data.id = parseInt(data.id, 10);

    if(data.hasOwnProperty("kills"))
        data.kills = parseInt(data.kills, 10);

    if(data.hasOwnProperty("assists"))
        data.assists = parseInt(data.assists, 10);

    if(data.hasOwnProperty("deaths"))
        data.deaths = parseInt(data.deaths, 10);
}

/**
 * Calculates the kill/death ratio and assist/death ratio based on the
 * given set of <b>kills</b>, <b>assists</b> and <b>deaths</b>.
 *
 * @param kills number of kills from the game
 * @param assists number of assists from the game
 * @param deaths number of deaths from the game
 */
const calculateKDandAD = function(kills, assists, deaths){
    let kd, ad;
    //We want to avoid divide by zero errors, but still allows for 0 deaths.
    //If there are 0 deaths, FPS games traditionally treat K/D = # kill and
    //A/D as assists
    if(deaths === 0) {
        kd = kills;
        ad = assists;
    }else{
        kd = parseFloat((kills / deaths).toFixed(DECIMAL_PRECISION));
        ad = parseFloat((assists / deaths).toFixed(DECIMAL_PRECISION));
    }
    return {
        kd_ratio: kd,
        ad_ratio: ad
    }
}

/**
 * Add the item stored in <b>data</b> into the appdata table. This set
 * of stats is assigned an unique ID number as well.
 *
 * @param data an object with stats to add to the table. It is expected
 *     to have fields for "kills", "assists", "deaths", "kd_ratio", and
 *     "ad_ratio."
 * @return {boolean} true on successful addition, false otherwise.
 */
const addItem = function(data){
    if(Number.isNaN(data.kills) || data.kills < 0 ||
       Number.isNaN(data.assists) || data.assists < 0 ||
       Number.isNaN(data.deaths) || data.deaths < 0)
        return false;

    let ratios = calculateKDandAD(data.kills, data.assists, data.deaths);
    appdata.push({
        "id": id,
        "kills": data.kills,
        "assists": data.assists,
        "deaths": data.deaths,
        "kd_ratio": ratios.kd_ratio,
        "ad_ratio": ratios.ad_ratio
    })
    id++;
    numEntries++;
    updateTotalsAvgs(data.kills, data.assists, data.deaths);
    return true;
}

/**
 * Modify the row in the appdata table with the given id to instead
 * have the stats stored in <b>data</b>. This set of stats will keep
 * the unique ID number that was assigned to it when it was added.
 *
 * @param data an object with stats to add to the table. It is expected
 *     to have fields for "id", "kills", "assists", "deaths", "kd_ratio",
 *     and "ad_ratio."
 * @return {boolean} true on successful modification, false otherwise.
 */
const modifyItem = function(data){
    let targetID = data.id;
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            //Remove old values from running total
            totalKills -= appdata[i]["kills"];
            totalAssists -= appdata[i]["assists"];
            totalDeaths -= appdata[i]["deaths"];

            //Modify only the fields that were provided
            if(!Number.isNaN(data.kills) && data.kills >= 0)
                appdata[i]["kills"] = data.kills;
            if(!Number.isNaN(data.assists) && data.assists >= 0)
                appdata[i]["assists"] = data.assists;
            if(!Number.isNaN(data.deaths) && data.deaths >= 0)
                appdata[i]["deaths"] = data.deaths;

            //Recalculate derived fields
            let ratios = calculateKDandAD(appdata[i]["kills"], appdata[i]["assists"], appdata[i]["deaths"]);
            appdata[i]["kd_ratio"] = ratios.kd_ratio;
            appdata[i]["ad_ratio"] = ratios.ad_ratio;

            updateTotalsAvgs(appdata[i]["kills"], appdata[i]["assists"], appdata[i]["deaths"]);
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

/**
 * Delete the row in the appdata table with the given id.
 *
 * @param data an object with the id of the row in appdata to remove.
 *     It is expected to have a field for "id".
 * @return {boolean} true on successful deletion, false otherwise.
 */
const deleteItem = function(data){
    if(Number.isNaN(data.id) || data.id < 0)
        return false;

    let targetID = data.id;
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            numEntries--;

            totalKills -= appdata[i]["kills"];
            totalAssists -= appdata[i]["deaths"];
            totalDeaths -= appdata[i]["assists"];
            updateAvgs();

            appdata.splice(i, 1);
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

/**
 * Wipe all the data stored on the server and reset count variables.
 * Return an a json indicating an empty table so index.html knows to
 * display and empty table.
 *
 * @param response an HTTP response that will be populate with an
 *     empty table to indicate that server data has been wiped.
 */
const clearStats = function(response){
    appdata = [];
    numEntries = 0;
    id = 0;
    totalKills = 0;
    totalAssists = 0;
    totalDeaths = 0;
    avgKills = 0;
    avgAssists = 0;
    avgDeaths = 0;
    sendTable(response);
}

/**
 * Update the total and average kills, assists and deaths by taking into
 * account the new set of <b>kills</b>, <b>assists</b> and <b>deaths</b>.
 *
 * @param kills number of kills from the game
 * @param assists number of assists from the game
 * @param deaths number of deaths from the game
 */
const updateTotalsAvgs = function(kills, assists, deaths){
    totalKills += kills;
    totalAssists += assists;
    totalDeaths += deaths;
    updateAvgs();
}

/**
 * Update the average kills, assists and deaths based on the current number
 * of kills, assists and deaths.
 */
const updateAvgs = function(){
    if(numEntries <= 0){
        numEntries = 0;
        avgKills = 0;
        avgAssists = 0;
        avgDeaths = 0;
    }
    avgKills = parseFloat((totalKills / numEntries).toFixed(DECIMAL_PRECISION));
    avgAssists = parseFloat((totalAssists / numEntries).toFixed(DECIMAL_PRECISION));
    avgDeaths = parseFloat((totalDeaths / numEntries).toFixed(DECIMAL_PRECISION));
}

/**
 * Creates an HTTP response with a JSON object that contains all the data for the
 * total_avg_results and result_list tables in index.html. This includes every
 * row of appdata as well as total and average number of kills, assists and deaths.
 * This JSON object is then stored in <b>response</b> and the headers are set.
 *
 * The format of the JSON object is as follows:
 * {
 *     numRows: ,
 *     rows: [
 *         { "id": , "kills": , "assists": , "deaths": , "kd_ratio": , "ad_ratio": },
 *         ...
 *         { "id": , "kills": , "assists": , "deaths": , "kd_ratio": , "ad_ratio": },
 *     ],
 *     totals_avgs: {
 *         total_kills:
 *         avg_kills:
 *         total_assists:
 *         avg_assists:
 *         total_deaths:
 *         avg_deaths:
 *     }
 * }
 *
 * @param response an HTTP response that will populated with a JSON object that
 *      contains every row of appdata as well as total and average number of kills,
 *      assists and deaths.
 */
const sendTable = function(response){
    let json = {
        "numRows": numEntries,
        "rows": [],
        "totals_avgs": {},
    }
    for(let i = 0; i < numEntries; i++){
        json["rows"].push(appdata[i]);
    }
    json["totals_avgs"] = {
        "total_kills": totalKills,
        "avg_kills": avgKills,
        "total_assists": totalAssists,
        "avg_assists": avgAssists,
        "total_deaths": totalDeaths,
        "avg_deaths": avgDeaths
    }
    let body = JSON.stringify(json);
    response.writeHead(200, "OK", {"Content-Type": "text/plain"});
    response.end(body);
}

/**
 * Creates an HTTP response that contains the contents of a stats.csv file,
 * which is a csv file that contains every row of appdata as well as total
 * and average number of kills, assists and deaths. This response is then
 * stored in <b>response</b> and the headers are set.
 *
 * @param response an HTTP response that will be populated the data for stats.csv.
 */
const sendCSV = function(response){
    /*
     * The following link from node.js documentation taught how to
     * close and flush write streams: https://nodejs.org/api/stream.html
     */
    let file = fs.createWriteStream("stats.csv");
    file.write(",Total,Average\n");
    file.write(`Kills,${totalKills},${avgKills}\n`);
    file.write(`Assists,${totalAssists},${avgAssists}\n`);
    file.write(`Deaths,${totalDeaths},${avgDeaths}\n\n`);

    file.write("ID #,Kills,Assists,Deaths,K/D Ratio,A/D Ratio\n");
    for(let i = 0; i < numEntries; i++){
        file.write(`${appdata[i]["id"]}, ${appdata[i]["kills"]}, ${appdata[i]["assists"]}, ${appdata[i]["deaths"]}, ${appdata[i]["kd_ratio"]}, ${appdata[i]["ad_ratio"]}\n`);
    }
    file.on("finish", function(){
        //Whole file has now been written, so send.
        sendFile(response, "stats.csv");
    });
    file.end();
}

/**
 * Creates an HTTP response that contains the contents of the file located,
 * at <b>filename</b>. This response is then stored in <b>response</b> and
 * the headers are set.
 *
 * @param response an HTTP response that will be populated with the data for
 *     <b>filename</b>.
 * @param filename the path to the file to send in <b>response</b>.
 */
const sendFile = function( response, filename ) {
    const type = mime.getType( filename )

    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHead( 200, "OK", { "Content-Type": type });
            response.end( content )

        }else{

            // file not found, error code 404
            response.writeHead( 404, "File Not Found");
            response.end("404 Error: File Not Found");
        }
   })
}

server.listen( process.env.PORT || port )
