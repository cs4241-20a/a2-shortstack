// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

//cahnge if task is completed of not. when makred as combleted, task will be removed.
function finishTask(e) {
  console.log('start finishing task');
  //Get the table row that is the parent's parent
  let tr = e.target.parentElement.parentElement;
  //Swap Completed or not
  if (tr.className === "Completed") {
    tr.className = "";
    e.target.innerHTML = "✓";
  } else {
    tr.className = "Completed";
    e.target.innerHTML = "✗";
  }
}

//send data to server
  const submit = function(e) {
    console.log('start submit');
    // prevent default form action
    e.preventDefault();

    //Valid input?
    if (!validateInput()) {
      return false;
    }

    let json = {};
    const input = document.forms["inputForm"].getElementsByTagName("input");

    //convert input into json
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      json[element["id"]] = element["value"];
    }
    const body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      body
    })
      .then(response => response.json())
      .then(function(response) {
        addRows(response);
      });

    return false;
  };

//Delete a row of task form the table and server
function deleteRows(e) {
  console.log('start delet row');
  //Find all taskeds  marked as comleted
  let toDelete = document.getElementsByClassName("Completed");
  let len = toDelete.length;

  for (let i = 0; i < len; i++) {
    //get index of combleted rows, (is 2 down from stated)
    let dIndex = toDelete[0].rowIndex - 2;
    let jsonDelete = { delete: 1, i: dIndex };
    const body = JSON.stringify(jsonDelete); // send info to json server

    //Send and log the delete post to server
    fetch("/submit", {
      method: "POST",
      body
    }).then(response => console.log(response.status));

    //delete row in HTML.
    toDelete[0].remove();
  }
}

//Handles the click action
const handleButton = function(e) {
  console.log('handle button');
  //Ignores if you click on anything but a button
  if (e.target.tagName === "BUTTON") {
    //Route the button press to the correct function
    if (e.target.id === "submit") {
      console.log('submit');
      submit(e);
    } else if (e.target.className === "checkButton") {
      console.log('finish task');
      finishTask(e);
    } else if (e.target.id === "delete") {
      console.log('delite row');
      deleteRows(e);
    }
  }
};

//Takes a json object and adds it to the table as a row
function addRows(jsonEntry) {
  console.log('addrows');
  //Find the table
  const tableBody = document.getElementById("TaskBody");
  //Insert a new cell and row
  let row = tableBody.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);

  //Fill those cells with server info.
  cell1.innerHTML = jsonEntry.task;
  cell2.innerHTML = jsonEntry.dDate;
  cell3.innerHTML = jsonEntry.mdate;
  cell4.innerHTML = '<button class="checkButton">✗</button>';
}

//Validates the input
function validateInput() {
  console.log('validateInput');
  const inputTask = document.getElementById("task").value;
  console.log(inputTask);
  // change.....
  
  const inputdd = document.getElementById("dDate").value;
  console.log(inputdd); // confirm if date?
  
  
  /*const regex = /^[A-Za-z ]+$/;
  if (!inputdd.match(regex)) {
    alert("Item must not contain numbers of symbols");
    return false;
  }*/
  return true;

  

  window.onload = function() {
    document.addEventListener("click", handleButton, false);
  };
}