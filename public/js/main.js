// Add some Javascript code here, to run on the front end.

function main() {

    const submit = function( e ) {
        // prevent default form action from being carried out
        e.preventDefault();

        const username = document.querySelector( '#username' );
        const guess = document.querySelector( '#guess' );
        const json = {
            username: username.value,
            guess: guess.value,
            remove: false
        }
        const body = JSON.stringify( json );

        fetch( '/submit', {
            method:'POST',
            body: body
        })
            .then( function( response ) {
                // do something with the reponse
                return response.text();
            })
            .then( function ( txt ) {
                console.log( JSON.parse(txt) )
            })

        return false;
    }

    const deleteUser = function( e ) {
        // prevent default form action from being carried out
        e.preventDefault();
        const username = document.querySelector( '#username' );
        const json = {
            username: username.value,
            remove: true
        }
        const body = JSON.stringify( json );

        fetch( '/submit', {
            method:'POST',
            body: body
        })
            .then( function( response ) {
                // do something with the reponse
                return response.text();
            })
            .then( function ( txt ) {
                console.log( JSON.parse(txt) )
            })

        return false;
    }

    const submitButton = document.getElementById("submit");
    const deleteButton = document.getElementById("delete");
    submitButton.onclick = submit;
    deleteButton.onclick = deleteUser;
}
