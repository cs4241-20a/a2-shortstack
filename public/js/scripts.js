// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let score = 0;


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
    let gw = document.getElementById("gameWindow"),
        gwStyle = window.getComputedStyle(gw);
    
    let w = parseInt(gwStyle.width.replace("px", ""));
    let h = parseInt(gwStyle.height.replace("px", ""));
    let gameState = {
        metaData : {
            width : w,
            height : h,
        },
        isRunning : true,
        entities : [
            { id : "0", x : 50, y : 50, dx : 1, dy : -1, updated : true},
            { id : "1", x : 100, y : 100, dx : -1, dy : 1, updated : true},
        ],
        ticks : 0,

    }
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
    return gs.isRunning;
}

function stepGame(gs){
    gs.ticks++;


    // step all entity movement
    for (i=0; i<gs.entities.length; i++){
        let e = gs.entities[i];
        if (e.x + e.dx >= gs.metaData.width - 50 || e.x + e.dx <= 0) { // check X collisions
            e.dx = -e.dx
        }
        if (e.y + e.dy >= gs.metaData.height - 50 || e.y + e.dy <= 0) { // check Y collisions
            e.dy = -e.dy
        }

        // move the shapes
        e.x += e.dx;
        e.y += e.dy;
    }

    

    return gs;
}

function updateDisplay(gs){
    for (i=0; i<gs.entities.length; i++){
        gs.entities[i].updated = false;
    }
    
    let gw = document.getElementById("gameWindow");
    let currElements = gw.children;

    for( i=0; i<currElements.length; i++) { 
        for (j=0; j<gs.entities.length; j++) { 
            if (gs.entities[i].id === currElements[j].id){
                currElements[j].style.left = gs.entities[i].x + "px";
                currElements[j].style.top = gs.entities[i].y + "px";
                gs.entities[i].updated = true;
            }
        }
    }
   
    for (i=0; i<gs.entities.length; i++){
       
        if (gs.entities[i].updated === false){
           
            let newDiv = document.createElement("div");
            newDiv.className = "entity";
           
            newDiv.id = gs.entities[i].id;
            gs.entities[i].updated = true;
            gw.appendChild(newDiv);
            newDiv.style.left = gs.entities[i].x + "px";
            newDiv.style.top = gs.entities[i].y + "px";
        }
    }
}




  window.onload = function() {
    const button = document.querySelector( 'button' );
    button.onclick = submit;
    score = 0;
    playGame();
  }