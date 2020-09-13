
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const makeinput = document.querySelector( '#vehiclemake' ),
          modelinput = document.querySelector( '#vehiclemodel' ),
          yearinput = document.querySelector( '#vehicleyear' ),
          table = document.querySelector( '#resultsTable'),
          json = { vehiclemake: makeinput.value , vehiclemodel: modelinput.value , vehicleyear: yearinput.value , vehicleage: (new Date().getFullYear() - yearinput.value)},
          body = JSON.stringify( json );

    //check if inputs are empty
    if(makeinput.value == "" || modelinput.value == "" || yearinput == "") {
      console.log("empty input!!!");
      return;
    }

    //make sure year is valid (number between when first car was made and this year)
    if (isNaN(yearinput.value) || 1879 > parseInt(yearinput.value) || parseInt(yearinput.value) > new Date().getFullYear()) {
      console.log("invalid year!!");
      return;
    }

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function(response) {
      return response.text()
    })
    .then( function(txt) {
      console.log(txt)
      updateTable(table, JSON.parse(txt))
    })

    return false
  }

  const updateTable = function(table, data) {
    var row = table.insertRow(-1)
    var make = row.insertCell(0);
    var model = row.insertCell(1);
    var year = row.insertCell(2);
    var age = row.insertCell(3);

    make.innerHTML = data.vehiclemake;
    model.innerHTML = data.vehiclemodel;
    year.innerHTML = data.vehicleyear;
    age.innerHTML = data.vehicleage;
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

    const table = document.querySelector( '#resultsTable' )
    fetch( '/appdata' )
    .then(function(response) {
      return response.json()
    })
    .then(function(array) {
      console.log(array);
      array.forEach(element => updateTable(table, JSON.parse(element)))
    })
  }
