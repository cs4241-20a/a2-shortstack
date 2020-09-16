// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let data;

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const name = document.querySelector('#input-name');
    const data = { 
        yourname: name.value 
    };

    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function logResponse (response) {
        // do something with the reponse 
        console.log(response);
    })

    return false;
}

const addRun = function (e) {
    e.preventDefault();

    const name = document.querySelector('#input-name').value;
    const location = document.querySelector('#input-location').value;
    const distance = document.querySelector('#input-distance').value;
    const time = document.querySelector('#input-time').value;

    const body = {
        name: name,
        location: location,
        distance: distance,
        time: time,
    };

    fetch('/addRun', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(function handleAddRunResponse(response) {
        if (response.status === 200) {  // OK
            console.log(`Successfully added run ${JSON.stringify(body)}`);
            loadData();  // Refresh the tables
            clearForm();  // Empty the text fields
        } else {
            console.error(`Failed to add run ${body}
            Error: ${response.message}`);
        }
    });
}

const deleteRun = function (deleteIndex) {
    fetch ('/deleteRun', {
        method: 'POST',
        body: deleteIndex
    }).then(function handleDeleteRunResponse(response) {
        if (response.status === 200) {  // OK
            console.log(`Successfully deleted run ${deleteIndex}.`);
            loadData();
        } else {
            console.error(`Failed to delete run ${deleteIndex}.
            Error: ${response.message}`);
        }
    })
}

const editRuns = function () {
    runsToSend = retrieveRuns();

    fetch('/editRuns', {
        method: 'POST',
        body: JSON.stringify(runsToSend)
    }).then(function handleEditRunsResponse(response) {
        if (response.status === 200) {  // OK
            console.log(`Successfully edited runs to ${JSON.stringify(runsToSend)}`);
            loadData();  // Refresh the tables
        } else {
            console.error(`Failed to edit runs to ${JSON.stringify(runsToSend)}
            Error: ${response.message}`);
        }
    });
}

const retrieveRuns = function () {
    const edit_table = document.querySelector('#edit-runs-table');
    let runsArray = [];
    // Iterate one fewer times than the number of rows (header)
    for(let i = 0; i < edit_table.rows.length - 1; i++) {
        let rowRun = {
            name: document.querySelector(`#input-name-edit-${i}`).value,
            location: document.querySelector(`#input-location-edit-${i}`).value,
            distance: document.querySelector(`#input-distance-edit-${i}`).value,
            time: document.querySelector(`#input-time-edit-${i}`).value,
        };
        runsArray.push(rowRun);
    }
    return runsArray;
}

const clearForm = function () {
    document.querySelector('#input-name').value = '';
    document.querySelector('#input-location').value = '';
    document.querySelector('#input-distance').value = '';
    document.querySelector('#input-time').value = '';
}

const clearTable = function (table) {
    let numRows = table.rows.length;
    for(let i = 1; i < numRows; i++) {
        // Repeatedly delete the row under the header
        table.deleteRow(1);
    }
}

const fillTable = function (table, data) {
    clearTable(table);
    let totalDistance = 0;
    for(let i = 0; i < data.length; i++) {
        let row = table.insertRow();
        row.insertCell().innerHTML = data[i].name;
        row.insertCell().innerHTML = data[i].location;
        row.insertCell().innerHTML = data[i].distance;
        row.insertCell().innerHTML = data[i].time;
        row.insertCell().innerHTML = data[i].speed;

        totalDistance += data[i].distance;
    }
    document.querySelector('#total-distance').innerHTML = totalDistance;
    document.querySelector('#num-marathons').innerHTML = totalDistance / 26.2;
}

const fillEditTable = function (table, data) {
    clearTable(table);
    for(let i = 0; i < data.length; i++) {
        let row = table.insertRow();
        row.insertCell().innerHTML = `<input type="text" id="input-name-edit-${i}" value="${data[i].name}"/>`;
        row.insertCell().innerHTML = `<input type="text" id="input-location-edit-${i}" value="${data[i].location}"/>`;
        row.insertCell().innerHTML = `<input type="number" id="input-distance-edit-${i}" value="${data[i].distance}"/>`;
        row.insertCell().innerHTML = `<input type="number" id="input-time-edit-${i}" value="${data[i].time}"/>`;
        row.insertCell().innerHTML = data[i].speed;
        row.insertCell().innerHTML = `<button class="delete-button" type="button" onclick="deleteRun(${i})">X</button>`;
    }
}

const loadData = function () {
    fetch('/getRuns', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (parsedData) {
            const table = document.querySelector('#runs-table');
            fillTable(table, parsedData);
        
            const edit_table = document.querySelector('#edit-runs-table');
            fillEditTable(edit_table, parsedData);
        });
    });
}

window.onload = function () {
    document.querySelector('#form-submit').onclick = addRun;
    document.querySelector('#submit-edits').onclick = editRuns;
    loadData();
}