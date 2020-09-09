// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

function handle_add(){
    console.log("add!");
    // prevent default form action from being carried out
    //e.preventDefault();
    //The following source showed me how to extract values from a
    //form: https://www.w3schools.com/jsref/coll_form_elements.asp
    const input = document.getElementById("add"),
          json = {
              kills: input.elements[0].value,
              assists: input.elements[1].value,
              deaths: input.elements[2].value,
          },
          body = JSON.stringify(json);

    fetch( '/add', {
        method:'POST',
        body
    }).then( function( response ) {
        // do something with the response
        console.log( response );
        return true;
    })

    return false;
}

function handle_modify(){
    console.log("modify!");
    console.log("add!");
    // prevent default form action from being carried out
    //e.preventDefault();
    //The following source showed me how to extract values from a
    //form: https://www.w3schools.com/jsref/coll_form_elements.asp
    const input = document.getElementById("modify"),
        json = {
            id_num: input.elements[0].value,
            kills: input.elements[1].value,
            assists: input.elements[2].value,
            deaths: input.elements[3].value,
        },
        body = JSON.stringify(json);

    fetch( '/modify', {
        method:'POST',
        body
    }).then( function( response ) {
        // do something with the response
        console.log( response );
        return true;
    })

    return false;
}

function handle_delete(){
    console.log("delete!");
    // prevent default form action from being carried out
    //e.preventDefault();
    //The following source showed me how to extract values from a
    //form: https://www.w3schools.com/jsref/coll_form_elements.asp
    const input = document.getElementById("delete"),
        json = {
            id_num: input.elements[0].value
        },
        body = JSON.stringify(json);

    fetch( '/delete', {
        method:'POST',
        body
    }).then( function( response ) {
        // do something with the response
        console.log( response );
        return true;
    })

    return false;
}