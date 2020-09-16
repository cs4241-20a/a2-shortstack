// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    json = {
            username: document.querySelector( '#username').value,
            firstname: document.querySelector( '#firstname').value,
            lastname: document.querySelector( '#lastname').value,
            dateofbirth: document.querySelector( '#dateofbirth').value
    }

    if(json.username === ""|| json.firstname === "" || json.lastname === "" || json.dateofbirth === ""){
        window.alert("All fields must be inputed")
        return false
    }

    var entry = {
            "username" : JSON.stringify(json.username),
            "firstname" : JSON.stringify(json.firstname),
            "lastname" : JSON.stringify(json.lastname),
            "dateofbirth" : JSON.stringify(json.dateofbirth)
    }



      function addRows(jsonEntry) {
          //Find the table
          const tableBody = document.getElementById("membersB");
          //Insert a new row and then new cells
          let row = tableBody.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);

          //Fill those cells with the data gotten back from the server, this includes the new fields
          cell1.innerHTML = jsonEntry.username;
          cell2.innerHTML = jsonEntry.firstname;
          cell3.innerHTML = jsonEntry.lastname;
          cell4.innerHTML = jsonEntry.dateofbirth;
          cell5.innerHTML = jsonEntry.age;
      }
          
    body = JSON.stringify(json),
    fetch( '/submit', {
      method:'POST',
      body 
    })
        .then(response => response.json())
        .then( function( response ){
            addRows(response);
        })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
