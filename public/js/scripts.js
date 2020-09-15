const getData = (json) => {
  console.log(json);
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = ""
  json.forEach((task) => {
    tasks.innerHTML+=`
    <tr>
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.task}</td>
      <td>${task.priority}</td>
      <td>${task.deadline}</td>
      <td>
      <div class="spacerMini"></div>
      <button class="deleteButton" id="${task.id}">Delete</button>
      </td>
      </tr>`
      ;
  });
};

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault();

  const name = document.querySelector("#taskName"),
     task = document.querySelector("#taskDesc"),
     priority = document.querySelector("#prio"),
     deadline = moment(),
     json = { name: name.value, task: task.value, priority: priority.value, deadline: deadline},
     body = JSON.stringify(json);

  fetch( '/submit', {
    method:'POST',
    body
  })
  .then(response => response.json())
  .then(json => {
    getData(json);
    taskName.value = "";
    taskDesc.value = "";
  })
  return false
}

const deleteTask = function (e) {
  e.preventDefault();
  const val = e.target.getAttribute("id");

  const json = {delete: 'delete', val},
  body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
  .then(response => response.json())
  .then(json => getData(json));

  return false;
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit;
  fetch("/api/getData")
    .then(response => response.json())
    .then((json) => {
      getData(json)
    });

    document.addEventListener("click", function (e) {
    if (e.target && e.target.classList[0] == "deleteButton") {
      deleteTask(e);
    }
  });
}
