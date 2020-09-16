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
  
  for (var idx in json) {
    createEntry(dataTable, json[idx])
  }
}

const createEntry = function (dataTable, json) {
  let row = dataTable.insertRow()

  let make = row.insertCell(0)
  let model = row.insertCell(1)
  let year = row.insertCell(2)
  let price = row.insertCell(3)
  let priority = row.insertCell(4)
  let del = row.insertCell(5)
  let save = row.insertCell(6)

  // make buttons
  var delBtn = document.createElement("button")
  delBtn.innerHTML = "Delete"
  delBtn.addEventListener("click", deleteItem)
  delBtn.className = 'del-btn'
  delBtn.id = json.id

  var saveBtn = document.createElement("button")
  saveBtn.innerHTML = "Save"
  saveBtn.addEventListener("click", saveItem)
  saveBtn.className = 'save-btn'
  saveBtn.id = json.id

  make.innerHTML = json.make
  model.innerHTML = json.model
  year.innerHTML = json.year
  price.innerHTML = json.price
  priority.innerHTML = json.priority
  del.appendChild(delBtn)
  save.appendChild(saveBtn)
}

const deleteItem = function () {
  // get the id from the row and delete from appdata and table; table should
  // just be deleteRow
  const json =
  {
    id: this.id
  }
  const body = JSON.stringify(json)

  fetch('/delete', {
    method: 'DELETE',
    body
  }).then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json))
    })

  // delete selected row from table 
  var i = this.parentNode.parentNode.rowIndex;
  document.getElementById("data-table").deleteRow(i);

  alert("Deleted entry.")
}

const saveItem = function () {
  // if changes made
  alert("Saved entry.")
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