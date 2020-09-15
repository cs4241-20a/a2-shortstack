// Add some Javascript code here, to run on the front end.
// let PouchDb = require('pouchdb');
//
// let db = new PouchDb('my_db');


const submitChanges = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // const nameInput = document.querySelector( '#name' ),
    const json = {
            name: document.querySelector( '#name' ).value,
            major: document.querySelector( '#major' ).value,
            course: document.querySelector( '#course' ).value
        },
        body = JSON.stringify( json )

    var table = document.getElementById('registration');
    var row = table.insertRow(1);
    var c0 = row.insertCell(0);
    var c1 = row.insertCell(1);
    var c2 = row.insertCell(2);
    var c3 = row.insertCell(3);

    c1.innerHTML = json.name;
    c2.innerHTML = json.major;
    c3.innerHTML = json.course;


    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( response => response.json())
        .then( function(response) {
            c0.innerHTML = response.id;
        })

    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submitChanges
}