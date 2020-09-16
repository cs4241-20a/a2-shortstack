
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const workerinput = document.querySelector('#worker'),
        classinput = document.querySelector('#class'),
        startinput = document.querySelector('#startTime'),
        endinput = document.querySelector('#endTime'),
        table = document.querySelector('#resultsTable'),
        json = { worker: workerinput.value, class: classinput.value, startTime: startinput.value, endTime: endinput.value, workTime: (endinput.value - startinput.value) },
        body = JSON.stringify(json);

    //check if inputs are empty
    if (nameinput.value == "" || classinput.value == "") {
        console.log("empty input");
        return;
    }

    //make sure year is valid (number between when first car was made and this year)
    if (8 > parseInt(startinput.value) || parseInt(endinput.value) > 24) {
        console.log("invalid time");
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
    var worker = row.insertCell(0);
    var classIs = row.insertCell(1);
    var startTime = row.insertCell(2);
    var endTime = row.insertCell(3);
    var workTime = row.insertCell(4);

    worker.innerHTML = data.worker;
    classIs.innerHTML = data.class;
    startTime.innerHTML = data.startTime;
    endTime.innerHTML = data.endTime;
    workTime.innerHTML = data.workTime;
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