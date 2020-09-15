// Processes the JSON from the server and fills in the body of the HTML table
const processJSON = (json) => {
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  json.forEach((task) => {
    tasks.innerHTML += `
    <tr>
      <td>${
        task.courseName
      }</td>
      <td>${
        task.task
      }</td>
      <td>${
        moment(task.dueDate).format("MM/DD/YYYY, h:mm a")
      }</td>
      <td>${
        task.effort
      }</td>
      <td>${
        task.priority
      }</td>
      <td><button class="deleteBtn" id="${task.id}">
        Delete</button>
      </td>
    </tr>
    `;
  });
}

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector('#courseName');
  const input2 = document.querySelector('#task');
  const input3 = document.querySelector('#dueDate');
  const input4 = document.querySelector('#effort');

  // alert the user tnat they need to specify all the data before adding a task
  if(input.value.toString().trim() == '' || input2.value.toString().trim() == '' || input3.value.toString().trim() == '' || input4.value.toString().trim() == '' ){
    alert("Please fill in all the fields");
    return false;
  }

  const json = {courseName: input.value, task : input2.value, dueDate : input3.value, effort : input4.value},
  body = JSON.stringify(json)

  fetch('/submit', {
    method:'POST',
    body
  })
  .then(response => response.json())
  .then(json => processJSON(json));

  // clear the input values now that we have added the inputs to the table
  document.getElementById("courseName").value = "";
  document.getElementById("task").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("effort").value = "1";

  return false;
}

//Delete function that POSTS a json object with delete and the id of the row to the server
const deleteTask = function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("id");

  const json = {delete: 'delete', id},
  body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
  .then(response => response.json())
  .then(json => processJSON(json));

  return false;
}

window.onload = function() {
  const addBtn = document.getElementById('addBtn')
  addBtn.onclick = submit;

  fetch('/appData')
  .then(response => response.json())
  .then(json => processJSON(json));

  // onClickListeners to add the delete functionality to all the delete buttons
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList[0] == "deleteBtn") {
      deleteTask(e);
    }
  });
}
