// Add some Javascript code here, to run on the front end.

// make the date
  var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };
//estimate the time it took based on fish size and line class
 function time(weight,line){
   p = weight;
   l = line;
  return (p/l);
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

    window.alert('Successfully Recorded');

          body = JSON.stringify(json)
    fetch('/submit', {
      method:'POST',
      body
    })
    .then(function(response){
      console.log(response.json());

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
      cell1.innerHTML = json.anglername;
      cell2.innerHTML = json.fishtype;
      cell3.innerHTML = json.lineclass;
      cell4.innerHTML = json.fishweight;
      cell5.innerHTML = curday('/');
      cell6.innerHTML = time(Number(json.fishweight),Number(json.lineclass));

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
