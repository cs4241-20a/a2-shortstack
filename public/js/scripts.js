
const submit = function (e) {
    e.preventDefault()

    const workerinput = document.querySelector('#worker'),
        startinput = document.querySelector('#startTime'),
        endinput = document.querySelector('#endTime'),
        table = document.querySelector('#workTable'),
        json = { worker: workerinput.value,  startTime: startinput.value, endTime: endinput.value, workTime: (parseInt(endinput.value) - parseInt(startinput.value)) },
        body = JSON.stringify(json);


    if (nameinput.value == "" ) {
        console.log("empty input");
        return;
    }

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
    var startTime = row.insertCell(1);
    var endTime = row.insertCell(2);
    var workTime = row.insertCell(3);

    worker.innerHTML = data.worker;
    startTime.innerHTML = data.startTime;
    endTime.innerHTML = data.endTime;
    workTime.innerHTML = data.workTime;
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit

    const table = document.querySelector('#workTable')
    fetch('/appdata')
        .then(function (response) {
            return response.json()
        })
        .then(function (array) {
            console.log(array);
            array.forEach(element => updateTable(table, JSON.parse(element)))
        })
}