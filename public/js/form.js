const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()


    let data = {}
    let body
    const all_inputs = document.querySelectorAll('input')
    all_inputs.forEach(x => data[x.name] = x.value)
    body = JSON.stringify(data)


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

const deleteEntry = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const delete_input = document.querySelector('#delete_input')
    let body = JSON.stringify({remove: delete_input.value})

    fetch('/submit', {method: 'POST', body}).then(function (response) {
        response.text().then((appData) => {
            populateTable(appData)
        })
    })

}

window.onload = function () {
    const deleteButton = document.querySelector('#delete_button')
    deleteButton.onclick = deleteEntry

    const button = document.querySelector('button')
    button.onclick = submit

    //Fetch the data from server
    let body = JSON.stringify({send_data: true})
    fetch('/submit', {method: 'POST', body}).then(function (response) {
        response.text().then((appData) => {
            populateTable(appData)
        })

    })
}


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
            <td><a href="https://www.google.com/search?q=${data.coords.lat}%2C+${data.coords.lng}">${data.coords.lat.toFixed(2)} : ${data.coords.lng.toFixed(2)}</td>
            <td>${data.died}</td>
            <th>${data.age.toFixed(0)}</th>
            <td>${data.genre}</td>
        </tr>`
    }
    recordsSection.innerHTML = header + htmlText + '</table>'
}




