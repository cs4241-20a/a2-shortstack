// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")


function generateBody(action) {
    let username = document.getElementById('username');
    let device = document.getElementById('device')
    let priceRating = document.getElementById('price');
    let batteryRating = document.getElementById('battery');
    let performanceRating = document.getElementById('performance');
    let feelRating = document.getElementById('device-feel');
    let index = document.getElementById('index')
    
    if (action == 3) {
        const jsonObject = { 
            delete: 'true',
            index: index.value
        }, body = JSON.stringify(jsonObject)
    
        return body;
    }

    else if (action == 2) {
        const jsonObject = { 
            index: index.value,
            username: username.value, 
            device: device.value,
            priceRating: priceRating.value, 
            batteryRating: batteryRating.value, 
            performanceRating: performanceRating.value,
            feelRating: feelRating.value
        }, body = JSON.stringify(jsonObject)
    
        return body;
    }

    else {
        const jsonObject = { 
            username: username.value, 
            device: device.value,
            priceRating: priceRating.value, 
            batteryRating: batteryRating.value, 
            performanceRating: performanceRating.value,
            feelRating: feelRating.value
        }, body = JSON.stringify(jsonObject)
    
        return body;
    }
}

function performFetch(name, body) {
    // fetching data from the input entries
    // POST used to send to server
    fetch( name, {
        // adding method type POST
        method:'POST',
        body // adding body of the input to send to server (is in JSON)
    })
    // response is from the server
    .then( function( response ) { // once this async promise task completes then run this particular function
        // do something with the reponse 
        console.log( response )
        updateTable()
    })

    resetForms();
}


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    body = generateBody(1)

    performFetch('/submit', body)

    return false;
}


const modify = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    body = generateBody(2)

    performFetch('/modify', body)

    return false;
}

const deletion = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    body = generateBody(3);

    performFetch('/deletion', body)

    return false;
}


function updateTable() {
    fetch('/reviews') // using fetch to GET the reviews array in server
    .then(response => response.json())
    .then(data => {
        console.log("Got Data from Server");
        console.log(data);

        createTable(data)
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createTable(data) {
    let table = document.getElementById('table');
    let numOfRows = table.rows.length;

    // clearing all the rows before re-inserting
    for (let i = numOfRows - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    for (let i = 0; i < data.length; i++) {
        let row = table.insertRow(1);
        let indexCol = row.insertCell(0);
        let usernameCol = row.insertCell(1); 
        let devicenameCol = row.insertCell(2);
        let priceCol = row.insertCell(3);
        let batteryCol = row.insertCell(4);
        let performanceCol = row.insertCell(5);
        let feelCol = row.insertCell(6);
        let overallCol = row.insertCell(7);

        indexCol.innerHTML = data[i].currentIndex;
        usernameCol.innerHTML = data[i].username;
        devicenameCol.innerHTML = data[i].device;
        priceCol.innerHTML = data[i].priceRating;
        batteryCol.innerHTML = data[i].batteryRating;
        performanceCol.innerHTML = data[i].performanceRating;
        feelCol.innerHTML = data[i].feelRating;
        overallCol.innerHTML = data[i].overallRating;
    }
}

function resetForms() {
    document.getElementById("name-input").reset();
    document.getElementById("device-selector").reset();
    document.getElementById("price-selector").reset();
    document.getElementById("battery-selector").reset();
    document.getElementById("performance").value = "1 Star";
    document.getElementById("device-feel").value = "1 Star";
    document.getElementById("index-input").reset();
}

window.onload = function() {
    const submitButton = document.getElementById( 'submit' )
    submitButton.onclick = submit;

    const modifyButton = document.getElementById('modify');
    modifyButton.onclick = modify;

    const deleteButton = document.getElementById('delete');
    deleteButton.onclick = deletion;


    fetch('/reviews') // using fetch to GET the reviews array in server
    .then(response => response.json())
    .then(data => {
        createTable(data)
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}