// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

var clickcount = 0;
let seconds = 0;


//when start button is clicked swap visibilities and start 30 second timer.
function startClicked() {
  seconds = document.getElementById('customseconds').value;
  if (seconds > 0) {
    console.log("Game started!");
    document.getElementById('customseconds').style.display = "none";
    document.getElementById('startbtn').style.display = "none";
    document.getElementById('currentclicks').innerHTML = "Click the button to start earning points!";
    var classes = document.getElementsByClassName('poststart');
    for (var i = 0; i < classes.length; i++) {
      classes[i].style.display = "block";
    }
    setTimeout(end, seconds * 1000); //after 3 seconds...
  } else {
    alert("Please give seconds greater than 0");
  }
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
    method: 'POST',
    body
  })
    .then(function (response) {
      //response
      response.json().then(function (data) {
        //data
        console.log("Submit Response:", response);
        console.log("Returned data: ", data);
        restartGame();

        buildTable(data);
      })
    })

  return false;
}

const deleteName = function (e) {
  //prevent default form action from being carried out
  e.preventDefault();

  const delName = {
    name: document.getElementById('delname').value
  }
  if (delName.name == "Mr. Insano") {
    alert("Well well well, looks like someone couldn't beat Mr. Insano like a true pro... tsk tsk");
  }

  const body = JSON.stringify(delName);

  fetch('/delete', {
    method: 'POST',
    body
  })
    .then(function (response) {
      //response
      response.json().then(function (data) {
        //data
        console.log("Delete Response:", response);
        console.log("Returned data: ", data);

        buildTable(data);
        document.getElementById('delname').value = "";
      })
    })

  return false;
}

//what to do after name is stored in server
function restartGame() {
  console.log("Restarting game...");
  clickcount = 0;


  document.getElementById('yourname').value = "";
  document.getElementById('currentclicks').style.display = "none";
  document.getElementById('inputname').style.display = "none";
  document.getElementById('yourname').style.display = "none";
  document.getElementById('submitbtn').style.display = "none";
  document.getElementById('startbtn').style.display = "block";
  document.getElementById('customseconds').style.display = "block";
  document.getElementById('customseconds').value = "Please input seconds here";
}

//generate a table for displaying under score
function buildTable(newScoreboard) {

  //sort by clicks per second
  newScoreboard.sort((a, b) => b.cps - a.cps);

  let table = document.getElementById('scoretable');
  //for building the scoreboard header for the table
  let newTable =
    '<tr>\n' +
    '<th>Placing</th>\n' +
    '<th>Player Name</th>\n' +
    '<th>Clicks Per Second</th>\n' +
    '<th>Total Clicks</th>\n' +
    '<th>Seconds</th>\n' +
    '<th>Input Time (H:min)</th>\n' +
    '</tr>\n';

  //for populating the scoreboard with scores.
  for (let i = 0; i < newScoreboard.length; i++) {
    let d = new Date(newScoreboard[i].time);
    let s = d.getMinutes();
    // if ((d.getMinutes() % 10) == 0) {
    //   s = d.getMinutes().toString() + "0";
    // }
    if (d.getMinutes() < 10) {
      s = "0" + d.getMinutes().toString();
    }
    newTable += ('<tr>\n');
    newTable += (`<td> #${i + 1}</td>\n`);
    newTable += (`<td> ${newScoreboard[i].name}</td>\n`);
    newTable += (`<td> ${newScoreboard[i].cps}</td>\n`);
    newTable += (`<td> ${newScoreboard[i].clicks}</td>\n`);
    newTable += (`<td> ${newScoreboard[i].seconds}</td>\n`);
    newTable += (`<td> ${d.getHours()}:${s}</td>\n`);
    newTable += ('</tr>\n');
  }
  table.innerHTML = newTable;
  console.log("Table populated: \n" + table.innerHTML);
}


window.onload = function () {
  const button = document.getElementById('submitbtn');
  button.onclick = submit;
  const delbutton = document.getElementById('delbtn');
  delbutton.onclick = deleteName;
  document.getElementById('customseconds').value = "Please input seconds here";
  document.getElementById('clickbtn').style.display = "none";
  document.getElementById('currentclicks').style.display = "none";
  document.getElementById('inputname').style.display = "none";
  document.getElementById('yourname').style.display = "none";
  document.getElementById('submitbtn').style.display = "none";
  console.log("Loaded!");
}