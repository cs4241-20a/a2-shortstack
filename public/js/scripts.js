// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let gw = document.getElementById("gameWindow"),
        gwStyle = window.getComputedStyle(gw);
    
  
let gameState = {
    metaData : {
        width : document.querySelector("#gameWindow").clientWidth,
        height : document.querySelector("#gameWindow").clientHeight,
        score : 0,
        maxID : 2, 
        startTimeMillis : -1,
        endTimeMillis : -1,
    },
    isRunning : true,
    entities : [
        { id : "0", x : 50, y : 50, dx : 1, dy : -1, life : 3 , element : null},
        { id : "1", x : 100, y : 100, dx : -1, dy : 1, life : 3 , element : null},
    ],
    ticks : 0,

}


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value, FinalScore : gameState.metaData.score, 
            date : (new Date()).toJSON(), 
            gameLength :  gameState.metaData.endTimeMillis - gameState.metaData.startTimeMillis},
          body = JSON.stringify( json );

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( async function( response ) {
        let appdata = await response.json()
        displayLeaderboard(appdata)
        console.log( appdata );
    });

    return false;
  }





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const playGame = async function ( ) {
    score = 0;
    gameState.metaData.startTimeMillis = (new Date()).getTime();
    console.log(gameState);
    while (stillRunning(gameState)){
        gameState = stepGame(gameState);
        updateDisplay(gameState);
      
        await sleep(9);
    }
    document.getElementById("score").innerHTML = "TIMES UP!!! Final Score = "+ gameState.metaData.score;
    gameState.metaData.endTimeMillis = (new Date()).getTime();

}


function stillRunning(gs){
    if (gs.ticks > 1000){
        gs.isRunning = false;
    }
    // TODO stop the game based on a time limit as opposed to tick limit
    return gs.isRunning;
}

function stepGame(gs){
    gs.ticks++;


    // step all entity movement
    for (i=0; i<gs.entities.length; i++){
        let e = gs.entities[i];
        if (e.x + e.dx >= gs.metaData.width - 50 || e.x + e.dx <= 0) { // check X collisions
            e.dx = -increaseSpeed(e.dx, 2);
            e.life--;
        }
        else if (e.y + e.dy >= gs.metaData.height - 50 || e.y + e.dy <= 0) { // check Y collisions
            e.dy = -increaseSpeed(e.dy, 2);
            e.life--;
        }

        // move the shapes
        e.x += e.dx;
        e.y += e.dy;
    }

    // TODO functionality of adding circles 

    if ((gs.ticks % 200) === 0){
        spawnNewCircle(randNum(gameState.metaData.width - 100, 50), randNum(gameState.metaData.height - 100, 50), randPosOrNeg(), randPosOrNeg(), gameState);
    }


    return gs;
}

function randNum(range, min){
    return Math.floor(Math.random() * range) + min;
}

function randPosOrNeg(){
    let r = Math.floor(Math.random() * 2) // 0 or 1

    let out = -1;
    if (r === 1){
        out = 1;
    }

    return out;
}

function spawnNewCircle(_x, _y, _dx, _dy, gs){
    // give circle correct id and proper fields and increment max id 
    let newC = { id : (++gs.metaData.maxID)+"", x : _x, y : _y, dx : _dx, dy : _dy, life : 3 , element : null};

    //console.log(newC);
    // add circle to entities
    gs.entities.push(newC);


}


function increaseSpeed(velocity, mag){
    if (velocity <= 0) {
        return velocity-mag;
    }
    else return velocity+mag;
}

function updateDisplay(gs){
    let gw = document.getElementById("gameWindow");

    for (i=0; i<gs.entities.length; i++){
        if (gs.entities[i].element != null){
            gs.entities[i].element.style.left = gs.entities[i].x + "px";
            gs.entities[i].element.style.top  = gs.entities[i].y + "px";
            switch(gs.entities[i].life){ 
                case 1:
                    gs.entities[i].element.style.background = "red";
                    break;
                case 2:
                    gs.entities[i].element.style.background = "yellow";
                    break;
                case 3:
                    gs.entities[i].element.style.background = "green";
                    break;
                default:
                    remove(gs.entities[i].element, false);
                    
                    break;
                }
        }
    }



    for (i=0; i<gs.entities.length; i++){
       
        if (gs.entities[i].element == null){
            let newDiv = document.createElement("div");
            newDiv.className = "entity";
           
            newDiv.id = gs.entities[i].id;
            gw.appendChild(newDiv);
            newDiv.onclick = function (){
                
                remove(newDiv, true);

            };
            newDiv.style.left = gs.entities[i].x + "px";
            newDiv.style.top = gs.entities[i].y + "px";
            gs.entities[i].element = newDiv;


            // FOR TESTING
            //newDiv.innerHTML = newDiv.id;
        }
    }
    
}

function remove(el, didScore) {
    if (stillRunning(gameState)){
        for(i=0; i<gameState.entities.length; i++){
            
         
            if (gameState.entities[i].id = el.id){
                //console.log("Removing " + gameState.entities[i].id);
                //gameState.metaData.score += gameState.entities[i].life;
                if (didScore){
                    console.log(gameState.entities[i]);
                    gameState.metaData.score += gameState.entities[i].life;
                    document.getElementById("score").innerHTML = "Score = "+ gameState.metaData.score;
                }
                delete gameState.entities[i].element;
                gameState.entities.splice(i, 1);
                break;
            }
        }
        el.remove();
    }
}

const pullLeaderboard = function () {
    fetch( '/db', {
        method:'GET'
    })
    .then( async function( response ) {
        // do something with the reponse
        let appdata = await response.json()
        displayLeaderboard(appdata)
        console.log( appdata );
    });
}

function displayLeaderboard(appdata){
    // assumes appdata is sorted with max score at the front
    let table = document.getElementById("leaderboard").getElementsByTagName('tbody')[0];
    while (table.firstChild){
        table.removeChild(table.lastChild);
    }
    let row = ''
   
   
    for (i=0; i<appdata.length;i++){
        let nRow = table.insertRow(table.rows.length);
        let nCell = nRow.insertCell(0);
        
      
        
        for (let j=Object.keys(appdata[i]).length-1; j>=0; j--){
            let key = Object.keys(appdata[i])[j];
            nCell = nRow.insertCell(0);
            row = appdata[i][key]
            let nText = document.createTextNode(row);
            nCell.appendChild(nText);
        }

       
        nCell = nRow.insertCell(0);
        row = (i+1)
        let nText = document.createTextNode(row);
        nCell.appendChild(nText);
     
    }

   
    console.log(row);
   
}



  window.onload = function() {
    const button = document.querySelector( '#form' );
    button.onclick = submit;
    score = 0;
   
    pullLeaderboard();
  }

  function load(){
    const button = document.querySelector( '#form' );
    button.onclick = submit;
    score = 0;
   
    pullLeaderboard();
  }