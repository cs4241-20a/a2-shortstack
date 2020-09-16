// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

var clickcount = 0;
const seconds = 3;

//when start button is clicked swap visibilities and start 30 second timer.
function startClicked() {
  console.log("Game started!");
  document.getElementById('startbtn').style.display = "none";
  document.getElementById('currentclicks').innerHTML = "Click the button to start earning points!";
  var classes = document.getElementsByClassName('poststart');
  for (var i = 0; i < classes.length; i++) {
    classes[i].style.display = "block";
  }
  setTimeout(end, seconds*1000); //after 3 seconds...
}


//increments number of clicks by 1 per click.
function addClicked() {
  clickcount += 1;
  document.getElementById('currentclicks').innerHTML = clickcount + " Points";
}

//after 30 second timer is elapsed disable button and allow recording.
function end() {
  console.log("3 seconds have passed");
  document.getElementById('clickbtn').style.display = "none"; //make click button disappear
  alert("You've run out of time!"); //give user alert to know of change

  if (clickcount === 0) {
    document.getElementById('currentclicks').innerHTML = "Wow... you didn't even try";
    document.getElementById('startbtn').style.display = "block";
  } else {
    document.getElementById('currentclicks').innerHTML = "You scored: " + clickcount + " Points!";

    var classes = document.getElementsByClassName('postgame'); //make game recording buttons appear
    for (var i = 0; i < classes.length; i++) {
      classes[i].style.display = "block";
    }

    //for loop here for checking if high score.
    //if high score: alert("Congratulations! You've bested the high score!")

    //else: alert("You've run out of time!");
  }
}

const submit = function (e) {
  //prevent default form action from being carried out
  e.preventDefault();

  if (document.getElementById('yourname').value === "") {
    alert("Please don't leave the name blank");
    return false;
  }

  const userScore = {
    name: document.getElementById('yourname').value,
    clicks: clickcount,
    seconds: seconds
  }

  const body = JSON.stringify(userScore);

  fetch('/submit', {
    method:'POST',
    body
  })
    .then(function (response) {
      console.log("fetched done. Response now");
      console.log(response);
      restartGame();

      return response;
      //do something with response
      //restartGame();
    })

  return false;
}

//what to do after name is stored in server
function restartGame() {
  console.log("Restarting game...");
  clickcount = 0;

  document.getElementById('yourname').innerText = "";
  document.getElementById('currentclicks').style.display = "none";
  document.getElementById('inputname').style.display = "none";
  document.getElementById('yourname').style.display = "none";
  document.getElementById('submitbtn').style.display = "none";
  document.getElementById('startbtn').style.display = "block";
}

//generate a table for displaying under score
function buildTable(name, cps, clicks) {
  let table = document.getElementById('scoretable');
  //for building the scoreboard header for the table
  table.innerHTML = 
  '<tr>\n' +
  '<th>Player Name</th>\n' +
  '<th>Clicks Per Second</th>\n' +
  '<th>Total Clicks</th>\n' +
  '<th>Seconds</th>\n' +
  '</tr>';

  //for populating the scoreboard with scores.
  for (let i = 0; i < scoreboard.length; i++) {
    const userScore = scoreboard[i];
  }
}


window.onload = function () {
  const button = document.getElementById('submitbtn')
  button.onclick = submit
  document.getElementById('clickbtn').style.display = "none";
  document.getElementById('currentclicks').style.display = "none";
  document.getElementById('inputname').style.display = "none";
  document.getElementById('yourname').style.display = "none";
  document.getElementById('submitbtn').style.display = "none";
  console.log("Loaded!");
}