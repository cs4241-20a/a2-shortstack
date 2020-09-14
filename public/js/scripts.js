/*
* Assignment: #2 Short Stack
* Due Date: 9/16/2020
* Author: Tom Graham 
*/


/*
* This function is used to create the submit for the HTML form. This accepts all the fields from the form
* and then builds a JSON object and submits the POST to the server, then retrives the response from the server
* which will be the updated due date based on the priority and the creationDate variables.
*/
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector('#taskName');
    const priority = document.querySelector('#priority');
    
    // dueDate must not be a const as we are changing the value on the server side when it's calculated.
    // creationDate is filled automatically by the server    
    json = { taskName: input.value, priority: priority.value, creationDate: "", dueDate: ""};
    body = JSON.stringify(json);

    fetch('/submit', {
      method: 'POST',
      body
    })
      .then(function (response) {
        return response.text();
      })
      .then ( function ( txt ){
        console.log (txt);
        txt = JSON.parse(txt);     
        let table = document.querySelector("table");
        updateTable(table, txt);
      })
    return false
  }

/*
* This function is used to load the table from the server's data on the page load. 
* It will send a GET request to /tasks which will allow the server to respond with
* the table of JSON Objects.
*/
  const onLoad = function () {
    fetch('/tasks', {
      method: 'GET'
    })
      .then(function (response) {
        console.log(response);
        return response.text();
      })
      .then ( function ( txt ){
        console.log(txt);
        txt = JSON.parse(txt);        
        let table = document.querySelector("table");
        createTable(table, txt);
      })
    return false
  }

/*
* This function is used to create the table from the server's data in memory. 
* It will add rows for each json object and then insert the cells for the data.
*/  
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

/*
* This function is used to update the currently loaded table in memory. 
* It will add a row for the newly created task. Must be different from the
* create function because it is only adding a single new row each time.
*/
function updateTable(table, data) {
  let row = table.insertRow();
  for (i in data) {
    let cell = row.insertCell();
    let cellContents = document.createTextNode(data[i]);
    cell.appendChild(cellContents);
  }
}

/*
* This function is run immediately when the window loads, I then call my 
* helper method(onLoad) to assist with loading the table right away. The
* button onclick is also set to submit which sets off the POST request.
*/
window.onload = function () {
  console.log('debug');
    onLoad();
    const button = document.querySelector('button')
    button.onclick = submit
}