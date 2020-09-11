const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//Format: { "id": 0, "kills": 0, "assists": 0, "deaths": 0, "kd_ratio": 0, "ad_ratio": 0 },
const appdata = [];

let id = 1;//Unique IDs to indicate rows to modify or delete
let numEntries = 0;//Length of appdata
let totalKills = 0;
let totalAssists = 0;
let totalDeaths = 0;
let avgKills = 0;
let avgAssists = 0;
let avgDeaths = 0;

const server = http.createServer( function( request,response ) {
    if(request.method === "GET") {
        handleGet(request, response);
    }else if(request.method === "POST"){
        handlePost(request, response);
    }
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if(request.url === "/") {
        sendFile(response, "public/index.html");
    }else if(request.url === "/results"){
        sendTable(response);
    }else if(request.url === "/csv"){
        sendCSV(response);
    }else{
        sendFile(response, filename);
    }
}

const handlePost = function( request, response ) {
    let dataString = '';

    request.on( 'data', function( data ) {
        dataString += data;
    })

    request.on( 'end', function() {
        let data = JSON.parse(dataString);
        console.log(data);

        if(request.url === "/add") {
            addItem(data);
            response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        }else if(request.url === "/modify"){
            modifyItem(data);
            response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        }else if(request.url === "/delete"){
            deleteItem(data);
            response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        }else{
            response.writeHead(400, "Invalid request type", {'Content-Type': 'text/plain'});
        }

        response.end();
    })
}

const addItem = function(data){
    appdata.push({
        "id": id,
        "kills": data.kills,
        "assists": data.assists,
        "deaths": data.kills,
        "kd_ratio": data.kills / data.deaths,
        "ad_ratio": data.assists / data.deaths
    })
    id++;
    numEntries++;
    calculateTotalsAvgs(data);
}

const modifyItem = function(data){
    let targetID = Number(data.id);
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            //Remove old values from running total
            totalKills -= Number(appdata[i]["kills"]);
            totalAssists -= Number(appdata[i]["deaths"]);
            totalDeaths -= Number(appdata[i]["assists"]);

            appdata[i]["kills"] = data.kills;
            appdata[i]["assists"] = data.assists;
            appdata[i]["deaths"] = data.deaths;
            appdata[i]["kd_ratio"] = data.kills / data.deaths;
            appdata[i]["ad_ratio"] = data.assists / data.deaths;

            calculateTotalsAvgs(data);
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

const deleteItem = function(data){
    let targetID = Number(data.id);
    console.log("targetID is: " +targetID);
    for(let i = 0; i < numEntries; i++){
        console.log(appdata[i]);
        if(appdata[i]["id"] === targetID){
            numEntries--;

            totalKills -= Number(appdata[i]["kills"]);
            avgKills = totalKills / numEntries;
            totalAssists -= Number(appdata[i]["deaths"]);
            avgAssists = totalAssists / numEntries;
            totalDeaths -= Number(appdata[i]["assists"]);
            avgDeaths = totalDeaths / numEntries;

            appdata.splice(i, 1);
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

const calculateTotalsAvgs = function(data){
    totalKills += Number(data.kills);
    avgKills = totalKills / numEntries;
    totalAssists += Number(data.assists);
    avgAssists = totalAssists / numEntries;
    totalDeaths += Number(data.deaths);
    avgDeaths = totalDeaths / numEntries;
}

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
