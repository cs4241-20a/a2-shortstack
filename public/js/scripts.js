// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

var clickcount = 0;
var highscores = [ //default highscores
  {place: 1, name: "Mr. Insano", cps: 73.3, clicks: 2200},
  {place: 2, name: "Cui2", cps: 2, clicks: 60}
]

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

    return false
  }

  //when start button is clicked swap visibilities and start 30 second timer.
  function start() {
    document.getElementById('clickbtn').style.display="block";
    document.getElementById('startbtn').style.display="none";
    const p = new Promise(function(resolve, reject) { 
      setTimeout(resolve, 3000) //after 3 seconds...
    })
    .then(end()) //run end() function
  }

  //increments number of clicks by 1 per click.
  function add() {
    clickcount += 1;
    document.getElementById('currentclicks').innerHTML = stringify(clickcount) + "Points";
  }

  //after 30 second timer is elapsed disable button and allow recording.
  function end() {
    document.getElementById('clickbtn').style.display="none";
    document.getElementsByClassName('postgame').style.display="block";

    //for loop here for checking if high score.
    //if high score: alert("Congratulations! You've bested the high score!")

    //else:
    alert("You've run out of time!");
  }

  // function generateTableHeader(table) {
  //   let thead = table.createTHead();
  //   let row = thead.insertRow();

  //   for (let key of data) {
  //     let th = document.createElement('th');
  //     let text = document.createTextNode(key);
  //     th.appendChild(text);
  //     row.appendChild(th);
  //   }
  // }

  // let table = document.querySelector('table');
  // let data = Object.keys(highscores[0]);
  // generateTableHeader(table, data);


  // function generateTable(table, data) {
  //   for (let element of data) {
  //     let row = table.insertRow();
  //     for (key in element) {
  //       let cell = row.insertCell();
  //       let text = document.createTextNode(element[key]);
  //       cell.appendChild(text);
  //     }
  //   }
  // }



  window.onload = function() {
    document.getElementById('clickbtn').style.display="none";
    document.getElementById('currentclicks').style.display="none";
    document.getElementById('inputname').style.display="none";
    document.getElementById('yourname').style.display="none";
    document.getElementById('submitbtn').style.display="none";
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }