let table;

// ordered array of ids
let orderedEntryIds = []

const addEntry = (e) => {
    // prevent default form action from being carried out
    e.preventDefault()

    const numMiles = document.querySelector('#miles').value;
    const mph = document.querySelector('#speed').value;
    const notes = document.querySelector('#notes').value;

    let body = {miles: numMiles, mph: mph, notes: notes};

    let requestBody = JSON.stringify(body)

    fetch('/add', {
        method: 'POST',
        body: requestBody
    })
        .then(function (response) {
            // do something with the response
            response.json().then((result) => addNewTableRow(result))
        })

    return false
}

const updateEntry = (e) => {
    // prevent default form action from being carried out
    e.preventDefault()

    const id = document.querySelector("#id").value;
    const numMiles = document.querySelector('#miles').value;
    const mph = document.querySelector('#speed').value;
    const notes = document.querySelector('#notes').value;

    let body = {id: id, miles: numMiles, mph: mph, notes: notes};

    let requestBody = JSON.stringify(body)

    fetch('/update', {
        method: 'POST',
        body: requestBody
    })
        .then(function (response) {
            // do something with the response
            response.json().then((result) => updateTableRow(result))
        })

    return false
};

const deleteEntry = (e) => {
    // prevent default form action from being carried out
    e.preventDefault()

    const id = document.querySelector("#id").value;

    if (id !== '') {

        let body = {id: id};
        let requestBody = JSON.stringify(body)

        fetch('/delete', {
            method: 'POST',
            body: requestBody
        })
            .then(function (response) {
                // do something with the response
                response.json().then((result) => handleDeleteTableRow(result))
            })

    }
    return false
};

const addCellValues = (rowObject, row) => {

    let cells = row.cells;

    for (let i = 0; i < cells.length; i++) {
        cells[i].style['max-width'] = '250px';
        cells[i].style['padding'] = '10px 5px';
        cells[i].style['word-wrap'] = 'break-word';
        cells[i].style['border-radius'] = '10px';
    }

    // add cell values
    cells[0].innerText = rowObject.id;
    cells[1].innerText = rowObject.miles;
    cells[2].innerText = rowObject.mph;
    cells[3].innerText = rowObject.notes;
    cells[4].innerText = rowObject.caloriesBurnt;
}


const addNewTableRow = (rowObject) => {
    // insert row
    let row = table.insertRow(1);

    // insert cells
    row.insertCell(0);
    row.insertCell(1);
    row.insertCell(2);
    row.insertCell(3);
    row.insertCell(4);

    addCellValues(rowObject, row);

    orderedEntryIds.unshift(rowObject.id);
};

const updateTableRow = (rowObject) => {

    if (Object.entries(rowObject).length) {
        let entryId = rowObject.id;

        let rowIndex = 0;

        orderedEntryIds.forEach((id, index) => {
            if (parseInt(id) === parseInt(entryId)) {
                rowIndex = index + 1; // since we need to account for header
            }
        })

        if (rowIndex !== 0) {

            let row = table.rows[rowIndex];

            addCellValues(rowObject, row);
        }
    } else {
        console.log('Nothing to update');
    }
};

const handleDeleteTableRow = (objWithId) => {

    if (Object.entries(objWithId).length) {
        let idToBeDeleted = parseInt(objWithId.id);

        let rowIndexToDelete = 0;

        orderedEntryIds.forEach((id, index) => {
            if (parseInt(id) === idToBeDeleted) {
                rowIndexToDelete = index + 1;
            }
        })

        if (rowIndexToDelete > 0) {

            // delete the table row with index
            table.deleteRow(rowIndexToDelete);

            orderedEntryIds = orderedEntryIds.filter((id) => id !== idToBeDeleted);
        }
    } else {
        console.log('Nothing to delete');
    }
};

window.onload = function () {
    table = document.getElementById('res-table')

    const addButton = document.getElementById('add')
    const updateButton = document.getElementById('update')
    const deleteButton = document.getElementById('delete')


    addButton.onclick = addEntry
    updateButton.onclick = updateEntry
    deleteButton.onclick = deleteEntry
}
