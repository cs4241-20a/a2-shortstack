const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault();
    const kills = document.querySelector("#kills"),
        deaths = document.querySelector("#deaths"),
        assists = document.querySelector('#assists'),
        json = { kills: kills.value, deaths: deaths.value, assists: assists.value },
        body = JSON.stringify(json);

    fetch("/submit", {
        method: "POST",
        body
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            let i = json.length - 1
            addRow(json[i])
        });

    return false;
};

//This function adds a new row of data to the table.
const addRow = function(data) {
    let table = document.getElementById("kdatable");

    let row = table.insertRow(-1),
        kills = row.insertCell(0),
        deaths = row.insertCell(1),
        assists = row.insertCell(2),
        kda = row.insertCell(3);

    kills.innerHTML = data.kills
    deaths.innerHTML = data.deaths
    assists.innerHTML = data.assists
    kda.innerHTML = data.kda


};

window.onload = function() {
    const button = document.querySelector("button");
    button.onclick = submit;
};