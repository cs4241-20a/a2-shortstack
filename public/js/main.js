// Add some Javascript code here, to run on the front end.

function main() {

    // On page load, pull any existing guesses from server
    fetch ('/table', {
        method: 'GET'
    })
        .then( function( response ) {
            return response.text();
        })
        .then( function ( txt ) {
            updateTable( JSON.parse(txt) );
        })

    const submit = function( e ) {
        // prevent default form action from being carried out
        e.preventDefault();

        // code snippet for timestamp from: https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
        var today = new Date();
        var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const username = document.querySelector( '#username' );
        if (username.value === "") {
            return false
        }

        const guess = document.querySelector( '#guess' );
        const json = {
            username: username.value,
            guess: guess.value,
            timestamp: dateTime,
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
                const responseArray = JSON.parse(txt);
                updateTable( responseArray );
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
                const responseArray = JSON.parse(txt);
                updateTable( responseArray );
            })

        return false;
    }

    function updateTable( responseArray ) {
        const updatedTableBody = document.createElement("tbody");
        updatedTableBody.setAttribute("id", "activeUsersList");

        for (let i = 0; i < responseArray.length; i++) {
            let row = updatedTableBody.insertRow(i);
            row.insertCell(0).innerText = responseArray[i].username;
            row.insertCell(1).innerText = responseArray[i].guess;
            row.insertCell(2).innerText = responseArray[i].status;
            row.insertCell(3).innerText = responseArray[i].attempts;
            row.insertCell(4).innerText = responseArray[i].timestamp;
        }
        const currentTable = document.getElementById("activeUsersTable");
        currentTable.replaceChild(updatedTableBody, document.getElementById("activeUsersList"));
    }


    document.getElementById("submit").onclick = submit;
    document.getElementById("delete").onclick = deleteUser;

}
