/**
 * submit -submit POST request
 * @param e
 * @returns {boolean}
 */
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()


    let data = {}
    let body
    //Get all input selectors
    const all_inputs = document.querySelectorAll('input')
    all_inputs.forEach(x => data[x.name] = x.value)
    //Convert JSON to string
    body = JSON.stringify(data)
    //Make request then populate table
    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            response.text().then((appData) => {
                populateTable(appData)
            })
        })

    return false
}

/**
 * deleteEntry -delete table entry by POST request
 * @param e
 */
const deleteEntry = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()


    const delete_input = document.querySelector('#delete_input')
    let body = JSON.stringify({remove: delete_input.value})

    //Make POST req and populate modified data
    fetch('/submit', {method: 'POST', body}).then(function (response) {
        response.text().then((appData) => {
            populateTable(appData)
        })
    })
}


window.onload = function () {
    //Get reference to buttons
    const deleteButton = document.querySelector('#delete_button')
    deleteButton.onclick = deleteEntry

    const button = document.querySelector('button')
    button.onclick = submit

    //When the window is loaded, fetch the data from server and populate table
    let body = JSON.stringify({send_data: true})
    fetch('/submit', {method: 'POST', body}).then(function (response) {
        response.text().then((appData) => {
            populateTable(appData)
        })
    })
}


/**
 * populateTable -populate table with data from the server
 * @param appData
 */
function populateTable(appData) {
    //Insert Data here
    const recordsSection = document.querySelector('#musician_records')

    //Server from data
    const jsonData = JSON.parse(appData)
    //Table header
    let header = `<table>
        <tr>
        <th>Entry</th>
            <th>Artist</th>
            <th>Born</th>
            <th>Birthplace</th>
            <th>Birthplace Coordinates</th>
            <th>Died</th>
            <th>Age</th>
            <th>Genre</th>
        </tr>`

    let htmlText = ''
    for (let index in jsonData) {
        let data = jsonData[index]
        htmlText += `<tr>
            <td>${index}</td>
            <td>${data.artist_name}</td>
            <td>${data.born}</td>
            <td>${data.birthplace}</td>
            <td><a href="https://www.google.com/search?q=${data.coords.lat}%2C+${data.coords.lng}">(${data.coords.lat.toFixed(2)}, ${data.coords.lng.toFixed(2)})</td>
            <td>${data.died}</td>
            <th>${data.age.toFixed(0)}</th>
            <td>${data.genre}</td>
        </tr>`
    }
    recordsSection.innerHTML = header + htmlText + '</table>'
}




