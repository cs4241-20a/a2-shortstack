
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const nameinput = document.querySelector('#workername'),
        startinput = document.querySelector('#starttime'),
        endinput = document.querySelector('#endtime'),
        table = document.querySelector('#resultsTable'),
        json = { workername: nameinput.value, starttime: startinput.value, endtime: endinput.value, worktime: (endinput.value - startinput.value), payment: (12.75 * (endinput.value - startinput.value)) },
        body = JSON.stringify(json);

    //check if inputs are empty
    if (nameinput.value == "") {
        console.log("empty input!!!");
        return;
    }

    if (8 > parseInt(startinput.value) || parseInt(endinput.value) > 23) {
        console.log("invalid year!!");
        return;
    }

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (txt) {
            console.log(txt)
            updateTable(table, JSON.parse(txt))
        })

    return false
}

const updateTable = function (table, data) {
    var row = table.insertRow(-1)
    var name = row.insertCell(0);
    var start = row.insertCell(1);
    var end = row.insertCell(2);
    var diff = row.insertCell(3);
    var pay = row.insertCell(4);

    name.innerHTML = data.workername;
    start.innerHTML = data.starttime;
    end.innerHTML = data.endtime;
    diff.innerHTML = data.worktime;
    pay.innerHTML = data.payment;
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit

    const table = document.querySelector('#resultsTable')
    fetch('/appdata')
        .then(function (response) {
            return response.json()
        })
        .then(function (array) {
            console.log(array);
            array.forEach(element => updateTable(table, JSON.parse(element)))
        })
}