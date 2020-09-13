// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    //fields
    const fName = document.getElementById("fName").value;
    const mName = document.getElementById("mName").value;
    const lName = document.getElementById("lName").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;

    //test
    console.log(fName);
    console.log(mName);
    console.log(lName);
    console.log(gender);
    console.log(birthday);

    //constructing the response
    let json = {
        firstName: fName,
        middleName: mName,
        lastName: lName,
        gender: gender,
        birthday: birthday
    };

    let body = JSON.stringify(json);

    fetch( '/submit', {
        method:'POST',
        body:body
    }).then( function( response ) {
        // do something with the response
        console.log( response )
    });

    return false
};

window.onload = function() {
    const button = document.querySelector( '#addGuestButton' );
    button.onclick = submit
};