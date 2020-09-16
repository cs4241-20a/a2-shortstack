// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// Form submit
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // input fields
    const name = document.querySelector( '#fightname' )
    const min = document.querySelector( '#min' )
    const sec = document.querySelector( '#sec' )
    const dmg = document.querySelector( '#dmg' )
          
    // make json
    const json = { fightname: name.value, 
                   minutes: min.value,
                   seconds: sec.value,
                   damage: dmg.value
                 },
          body = JSON.stringify( json )

    //fetch
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // convert response to a JSON object
      response = response.json().then(
        function(data){
        // do stuff with the response
        console.log(data);
        updateStats(data);
        //console.log(data.minutes)
        })
    })


    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

// Takes the calculated stats from the server and updates the webpage.
function updateStats(data){
  let highestDPS = document.getElementById("highestDPS");
  highestDPS.textContent = roundTwoPlaces(data.maxDPS); 
  
  let avgDPS = document.getElementById("avgDPS");
  avgDPS.textContent = roundTwoPlaces(data.avgDPS); 
  
  makeRow(data);
}

function makeRow(data){
  let table = document.getElementById("data");
  let row = table.insertRow(table.rows.length);
  
  let cell1 = row.insertCell(0);
  cell1.innerHTML = data.fightname;
  let cell2= row.insertCell(1);
  cell2.innerHTML = data.duration;
  let cell3 = row.insertCell(2);
  cell3.innerHTML = data.damage;
  let cell4 = row.insertCell(3);
  cell4.innerHTML = roundTwoPlaces(data.DPS);
}

// Rounds a number to two decimal places.
function roundTwoPlaces(num){
  return Math.round((num + Number.EPSILON) * 100) / 100;
}