// Add some Javascript code here, to run on the front end.



function playAudio() {
    var x = document.getElementById("myAudio");
    x.play();
}


const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  json = {
    anglername: document.querySelector('#anglername').value,
    fishtype: document.querySelector('#fishtype').value,
    fishweight: document.querySelector('#fishweight').value,
    lineclass: document.querySelector('#line').value
  }

  if(json.anglername === "" || json.fishtype === "" || json.fishweight === "" || json.lineclass === ""){
      window.alert('All of the fields must be filled');
        return false;
  }
  if(!parseInt(json.fishweight) || !parseInt(json.lineclass)){
      window.alert('These fields must be numbers');
      return false;
  }

  window.alert('Successfully Recorded');
    playAudio();
  body = JSON.stringify(json)
  fetch('/submit', {
    method:'POST',
    body
  })

      .then(response => response.json())
      .then(function (response){


        var table = document.getElementById("table1");
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = response.anglername;
        cell2.innerHTML = response.fishtype;
        cell3.innerHTML = response.lineclass;
        cell4.innerHTML = response.fishweight;
        cell5.innerHTML = response.date;
        cell6.innerHTML = response.time;
      })
  return false
}

// function Main(){
//   fetch('/read', {
//     method:'GET'
//   })
//   .then( function(response) {
//
//     console.log(JSON.stringify(response))
//   })
// }

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
}
