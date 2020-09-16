// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // create json listing of input params
    const manufacturer = document.querySelector( '#clubManufacturer' ),
        model = document.querySelector( '#clubModel' ),
        type = document.querySelector( '#clubType' ),
        loft = document.querySelector( '#clubLoft' ),
        distance = document.querySelector( '#clubDistance' ),
        json = { 
            manufacturer: manufacturer.value,
            model: model.value,
            type: type.value,
            loft: Number(loft.value).toFixed(1),
            distance: Number(distance.value).toFixed(1),
        };
    
    // check for empty values
    for (var entry of Object.keys(json)) {
        if (entry.value === "") {
            console.warn("Must specify value for " + entry + "!");
            return;
        }
    }

    // verify distance and loft are numbers
    if (isNaN(loft.value)) {
        console.warn("Loft must be a number!");
        return;
    }
    if (isNaN(distance.value)) {
        console.warn("Distance must be a number!");
        return;
    }

    // convert to string
    body = JSON.stringify( json );

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function(response) {
        return response.json();  // wait on response
    })
    .then(function( array ) {
        displayGolfBag(array)    // update golf bag table
    })
    
    return false
}

// update table using provided array of json elements to be displayed in the table
const displayGolfBag = function(array) {
    // retrieve existing golf bag table
    const golfBag = document.querySelector( '#clubs' )
    // replace existing table with new table
    document.getElementById('clubs').innerHTML = '';
    for (var i = 0; i < array.length; i++) {
        // grab current json element and create a new row in the table since the 
        // data is already sorted server side
        const input = array[i]
        var row = golfBag.insertRow(-1);

        // create cells corresponding to th headers
        var manufacturer = row.insertCell(0);
        var model = row.insertCell(1);
        var type = row.insertCell(2);
        var loft = row.insertCell(3);
        var distance = row.insertCell(4);
        var ballSpeed = row.insertCell(5);
        var swingSpeed = row.insertCell(6);

        // update text displayed in each cell
        manufacturer.innerHTML = input.manufacturer;
        model.innerHTML = input.model;
        type.innerHTML = input.type;
        loft.innerHTML = input.loft;
        distance.innerHTML = input.distance;
        ballSpeed.innerHTML = input.ballSpeed;
        swingSpeed.innerHTML = input.swingSpeed;
    }
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

    /*
    Load golf bag from golfbag array in memory
    */
    fetch('/golfbag')
    .then( function(response) {
        return response.json();  // wait on response
    })
    .then(function(array){ // parse from array into table
        displayGolfBag(array);
    })
}