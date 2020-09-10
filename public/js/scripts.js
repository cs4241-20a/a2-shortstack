// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let gw = document.getElementById("gameWindow"),
        gwStyle = window.getComputedStyle(gw);
    
    let w = parseInt(gwStyle.width.replace("px", ""));
    let h = parseInt(gwStyle.height.replace("px", ""));

let gameState = {
    metaData : {
        width : w,
        height : h,
        score : 0,
        maxID : 2, 
    },
    isRunning : true,
    entities : [
        { id : "0", x : 50, y : 50, dx : 1, dy : -1, life : 3 , updated : true},
        { id : "1", x : 100, y : 100, dx : -1, dy : 1, life : 3 , updated : true},
    ],
    ticks : 0,

}


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value, FinalScore : 100, date : (new Date()).toJSON() },
          body = JSON.stringify( json );

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response );
    });

    return false;
  }


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const playGame = async function ( ) {
    
  
    console.log(gameState);
    while (stillRunning(gameState)){
        gameState = stepGame(gameState);
        updateDisplay(gameState);
        await sleep(9);
    }

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

    return gs;
}

function increaseSpeed(velocity, mag){
    if (velocity <= 0) {
        return velocity-mag;
    }
    else return velocity+mag;
}

function updateDisplay(gs){
    for (i=0; i<gs.entities.length; i++){
        gs.entities[i].updated = false;
    }
    
    let gw = document.getElementById("gameWindow");
    let currElements = gw.children;

    for( i=0; i<currElements.length; i++) { 
        for (j=0; j<gs.entities.length; j++) { 
            if (gs.entities[j].id === currElements[i].id){
                gs.entities[j].updated = true;
                currElements[i].style.left = gs.entities[j].x + "px";
                currElements[i].style.top = gs.entities[j].y + "px";
                switch(gs.entities[j].life){ 
                    case 1:
                        currElements[i].style.background = "red";
                        break;
                    case 2:
                        currElements[i].style.background = "yellow";
                        break;
                    case 3:
                        currElements[i].style.background = "green";
                        break;
                    default:
                        remove(currElements[i])
                        i--;
                        j--;
                        break;
                 }
                
            }
        }
    }
    for (i=0; i<gs.entities.length; i++){
       
        if (gs.entities[i].updated === false){
           
           console.log(gs.entities[i]);
            let newDiv = document.createElement("div");
            newDiv.className = "entity";
           
            newDiv.id = gs.entities[i].id;
            gs.entities[i].updated = true;
            gw.appendChild(newDiv);
            newDiv.onclick = function (){remove(newDiv)};
            newDiv.style.left = gs.entities[i].x + "px";
            newDiv.style.top = gs.entities[i].y + "px";
        }
    }
    document.getElementById("score").innerHTML = "Score = "+ gameState.metaData.score;
}

function remove(el) {
    if (stillRunning(gameState)){
        console.log("removeing element " + el.id)
        for(i=0; i<gameState.entities.length; i++){
            if (gameState.entities[i].id = el.id){
                console.log("removeing entity " + el.id)
                gameState.metaData.score += gameState.entities[i].life;
                gameState.entities.splice(i, 1);
            }
        }
        el.remove();
    }
}


  window.onload = function() {
    const button = document.querySelector( 'button' );
    button.onclick = submit;
    score = 0;
    playGame();
  }