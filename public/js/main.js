// Add some Javascript code here, to run on the front end.

function main() {

    refreshData();
    document.getElementById("submit").onclick = submit;
    document.getElementById("delete").onclick = deleteUser;
    document.getElementById("refresh").onclick = refreshButtonClicked;
}

const refreshButtonClicked = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();
    refreshData();
}

function refreshData() {
    // On page load, pull any existing guesses from server
    fetch('/table', {
        method: 'GET'
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (txt) {
            updateTables(JSON.parse(txt));
        })
}

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    // code snippet for timestamp from: https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
    let today = new Date();
    let date = (today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    const username = document.querySelector('#username');
    if (username.value === "") {
        return false
    }

    const guess = document.querySelector('#guess');
    const json = {
        username: username.value,
        guess: guess.value,
        timestamp: dateTime,
        remove: false
    }

    const body = JSON.stringify(json);

    fetch('/submit', {
        method: 'POST',
        body: body
    })
        .then(function (response) {
            // do something with the reponse
            return response.text();
        })
        .then(function (txt) {
            const responseArray = JSON.parse(txt);
            updateTables(responseArray);
        })

    return false;
}

const deleteUser = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();
    const username = document.querySelector('#username');
    const json = {
        username: username.value,
        remove: true
    }
    const body = JSON.stringify(json);

    fetch('/submit', {
        method: 'POST',
        body: body
    })
        .then(function (response) {
            // do something with the reponse
            return response.text();
        })
        .then(function (txt) {
            const responseArray = JSON.parse(txt);
            updateTables(responseArray);
        })

    return false;
}

function updateTables(responseArray) {

    const updatedUserList = document.createElement("tbody");
    updatedUserList.setAttribute("id", "activeUsersList");

    const updatedRankingsList = document.createElement("tbody");
    updatedRankingsList.setAttribute("id", "rankingsList");

    let rankings = []

    for (let i = 0; i < responseArray.length; i++) {
        let userRow = updatedUserList.insertRow(i);
        userRow.insertCell(0).innerText = responseArray[i].username;
        userRow.insertCell(1).innerText = responseArray[i].guess;
        userRow.insertCell(2).innerText = responseArray[i].status;
        userRow.insertCell(3).innerText = responseArray[i].attempts;
        userRow.insertCell(4).innerText = responseArray[i].timestamp;

        if (responseArray[i].win) {

            let placed = false;

            for (let j = 0; j < rankings.length; j++) {

                // if attempts are equal, timestamp is tiebreaker
                if (responseArray[i].attempts > rankings[j].attempts
                    || responseArray[i].attempts === rankings[j].attempts &&
                    (new Date(responseArray[i].timestamp).getTime() > new Date(rankings[j].timestamp).getTime())) {

                    rankings.splice(j, 0, responseArray[i]);
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                rankings.push(responseArray[i]);
            }
        }
    }

    rankings.reverse();

    for (let k = 0; k < rankings.length; k++) {
        let rankingsRow = updatedRankingsList.insertRow(k);
        rankingsRow.insertCell(0).innerText = (k + 1).toString();
        rankingsRow.insertCell(1).innerText = rankings[k].username;
        rankingsRow.insertCell(2).innerText = rankings[k].attempts;
        rankingsRow.insertCell(3).innerText = rankings[k].timestamp;
    }

    const currentUserTable = document.getElementById("activeUsersTable");
    currentUserTable.replaceChild(updatedUserList, document.getElementById("activeUsersList"));

    const currentRankingsTable = document.getElementById("rankingsTable");
    currentRankingsTable.replaceChild(updatedRankingsList, document.getElementById("rankingsList"));
}

