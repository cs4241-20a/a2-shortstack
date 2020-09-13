const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector('#taskName');
    const priority = document.querySelector('#priority');
    const creationDate = document.querySelector('#creationDate');
    let dueDate = "";

    json = { taskName: input.value, priority: priority.value, creationDate: creationDate.value, dueDate: ""};
    body = JSON.stringify(json);

    fetch('/submit', {
      method: 'POST',
      body
    })
      .then(function (response) {
        return response.text();
      })
      .then ( function ( txt ){
        txt = JSON.parse(txt);        
        let table = document.querySelector("table");
        createTable(table, txt);
      })
    return false
  }

function createTable(table, data) {
  for (let word of data) {
    let row = table.insertRow();
    for (i in word) {
      let cell = row.insertCell();
      let cellContents = document.createTextNode(word[i]);
      cell.appendChild(cellContents);
    }
  }
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
  }