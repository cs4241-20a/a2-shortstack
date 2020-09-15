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
        console.log(data);
        //Convert everything to a Number now so all operations
        //dont have to keep calling Number()
        convertDataToNum(data);
        calculateKDandAD(data);//Calculate derived fields

        //Call the proper function based on API call, then
        //send the updated table information in response so
        // index.html can display the updated table.
        if(request.url === "/add") {
            addItem(data);
            sendTable(response);
        }else if(request.url === "/modify"){
            modifyItem(data);
            sendTable(response);
        }else if(request.url === "/delete"){
            deleteItem(data);
            sendTable(response);
        }else{
            //Not recognized
            response.writeHead(400, "Invalid request type", {'Content-Type': 'text/plain'});
            response.end();
        }
    })
}

/**
 * Converts the stats given in the HTTP request to Numbers, and stores
 * them back into <b>data</b>.
 *
 * @param data an object containing "kills", "assists", and "deaths" fields
 *     from the HTTP request.
 */
const convertDataToNum = function(data){
    if(data.hasOwnProperty("kills"))
        data.kills = parseInt(data.kills, 10);

    if(data.hasOwnProperty("assists"))
        data.assists = parseInt(data.assists, 10);

    if(data.hasOwnProperty("deaths"))
        data.deaths = parseInt(data.deaths, 10);
}

/**
 * Calculates the kill/death ratio and assist/death ratio based on the
 * kills, assists and deaths fields in <b>data</b>.
 *
 * @param data an object with "kills", "assists", and "deaths" fields for
 *     calculating the kill/death and assist/death ratio. All three fields
 *     are expected to contain Numbers.
 */
const calculateKDandAD = function(data){
    data.kd_ratio = parseFloat((data.kills / data.deaths).toFixed(DECIMAL_PRECISION));
    data.ad_ratio = parseFloat((data.assists / data.deaths).toFixed(DECIMAL_PRECISION));
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
    appdata.push({
        "id": id,
        "kills": data.kills,
        "assists": data.assists,
        "deaths": data.deaths,
        "kd_ratio": data.kd_ratio,
        "ad_ratio": data.ad_ratio
    })
    id++;
    numEntries++;
    updateTotalsAvgs(data);
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
    let targetID = Number(data.id);
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            //Remove old values from running total
            totalKills -= appdata[i]["kills"];
            totalAssists -= appdata[i]["deaths"];
            totalDeaths -= appdata[i]["assists"];

            appdata[i]["kills"] = data.kills;
            appdata[i]["assists"] = data.assists;
            appdata[i]["deaths"] = data.deaths;
            appdata[i]["kd_ratio"] = data.kd_ratio;
            appdata[i]["ad_ratio"] = data.ad_ratio;

            updateTotalsAvgs(data);
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
    let targetID = data.id;
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            numEntries--;

            totalKills -= appdata[i]["kills"];
            avgKills = totalKills / numEntries;
            totalAssists -= appdata[i]["deaths"];
            avgAssists = totalAssists / numEntries;
            totalDeaths -= appdata[i]["assists"];
            avgDeaths = totalDeaths / numEntries;

            appdata.splice(i, 1);
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

const clearStats = function(response){
    appdata = [];
    numEntries = 0;
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
 * account the new set of kills, assists and death in <b>data</b>.
 *
 * @param data an object with stats to add to the table. It is expected
 *     to have fields for "kills", "assists", "deaths", "kd_ratio", and
 *     "ad_ratio."
 */
const updateTotalsAvgs = function(data){
    totalKills += data.kills;
    avgKills = totalKills / numEntries;
    totalAssists += data.assists;
    avgAssists = totalAssists / numEntries;
    totalDeaths += data.deaths;
    avgDeaths = totalDeaths / numEntries;
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
