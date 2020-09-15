// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

var clickcount = 0;
var highscores = [ //default highscores
  { name: "Mr. Insano", cps: 73.3, clicks: 2200 },
  { name: "Cui2", cps: 2, clicks: 60 }
]



//when start button is clicked swap visibilities and start 30 second timer.
function start() {
  console.log("Clicked!");
  document.getElementById('startbtn').style.display = "none";
  document.getElementById('currentclicks').innerHTML = "Click the button to start earning points!";
  var classes = document.getElementsByClassName('poststart');
  for (var i = 0; i < classes.length; i++) {
    classes[i].style.display = "block";
  }
  setTimeout(end, 3000); //after 3 seconds...
}


//increments number of clicks by 1 per click.
function add() {
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

function submit() {
  if (document.getElementById('yourname').value === "") {
    console.log("BLANKED");
    alert("Please don't leave the name blank");
  }
  else {
    const submit = function (e) {
      // prevent default form action from being carried out
      e.preventDefault()

      const input = document.querySelector('#yourname'),
        json = { yourname: input.value },
        body = JSON.stringify(json)
      fetch('/submit', {
        method: 'POST',
        body
      })
        .then(function (response) {
          // do something with the reponse 
          console.log(response)
        })
    }
    return false
  }
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



window.onload = function () {
  console.log("Loaded!");
  document.getElementById('clickbtn').style.display = "none";
  document.getElementById('currentclicks').style.display = "none";
  document.getElementById('inputname').style.display = "none";
  document.getElementById('yourname').style.display = "none";
  document.getElementById('submitbtn').style.display = "none";
  const button = document.getElementById('submitbtn')
  button.onclick = submit
}