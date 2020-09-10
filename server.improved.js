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
    }else if(request.url === "/table"){
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
}

const modifyItem = function(data){
    let targetID = Number(data.id);
    for(let i = 0; i < numEntries; i++){
        if(appdata[i]["id"] === targetID){
            appdata[i]["kills"] = data.kills;
            appdata[i]["assists"] = data.assists;
            appdata[i]["deaths"] = data.deaths;
            appdata[i]["kd_ratio"] = data.kills / data.deaths;
            appdata[i]["ad_ratio"] = data.assists / data.deaths;
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
            appdata.splice(i, 1);
            numEntries--;
            return true;
        }
    }
    //Entry if given ID not found.
    return false;
}

const sendTable = function(response){
    let json = {
        "numRows": numEntries,
        "rows": []
    }
    for(let i = 0; i < numEntries; i++){
        json["rows"].push(appdata[i]);
    }
    let body = JSON.stringify(json);
    response.writeHead(200, "OK", {"Content-Type": "text/plain"});
    response.end(body);
}

const sendCSV = function(response){
    let file = fs.createWriteStream("stats.csv");

    file.write("id,kills,assists,deaths,K/D Ratio, A/D Ratio\n");
    for(let i = 0; i < numEntries; i++){
        file.write(`${appdata[i]["id"]}, ${appdata[i]["kills"]}, ${appdata[i]["assists"]}, ${appdata[i]["deaths"]}, ${appdata[i]["kd_ratio"]}, ${appdata[i]["ad_ratio"]}\n`);
    }
    file.end();

    //sendFile(response, "stats.csv");
    const type = mime.getType( "stats.csv" );

    fs.readFile( "stats.csv", function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHead( 200, "OK", { "Content-Type": type, "Content-Disposition": "attachment; filename=stats.csv" });
            response.end( content );

        }else{

            // file not found, error code 404
            response.writeHead( 404, "File Not Found");
            response.end("404 Error: File Not Found");
        }
    })
    //response.writeHead(200, "OK", {"Content-disposition": "attachment; filename=newstats.csv"});
    //console.log(response);
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
