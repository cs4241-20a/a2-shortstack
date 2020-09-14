// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const make = document.querySelector('#Make')
  const model = document.querySelector('#Model')
  const year = document.querySelector('#Year')
  const price = document.querySelector('#Price')

  const json = {
    make: make.value,
    model: model.value,
    year: year.value,
    price: price.value
  }

  const body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(response => response.json())
    .then(json => {
      updateTable(json)
    })

  document.getElementById('Make').value = ""
  document.getElementById('Model').value = ""
  document.getElementById('Year').value = ""
  document.getElementById('Price').value = ""

  return false
}

const updateTable = function (json) {
  let dataTable = document.getElementById('data-table')

  if (json.length > 1){
    for(var idx in json){
      updateRow(dataTable, json[idx])
    }
  }
  else{
    updateRow(dataTable, json)
  }
}

const updateRow = function(dataTable, json) {
  let row = dataTable.insertRow()

  let make = row.insertCell(0)
  let model = row.insertCell(1)
  let year = row.insertCell(2)
  let price = row.insertCell(3)
  let priority = row.insertCell(4)

  make.innerHTML = json.make
  model.innerHTML = json.model
  year.innerHTML = json.year
  price.innerHTML = json.price
  priority.innerHTML = json.priority
}

window.onload = function () {
  const button = document.querySelector('button')
  button.onclick = submit

  fetch('/data')
  .then(response => response.json())
  .then(json => {
    updateTable(json)
  })
}