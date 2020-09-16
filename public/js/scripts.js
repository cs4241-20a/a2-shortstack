// Add some Javascript code here, to run on the front end.

const dateElement = document.getElementById("date"),
  list = document.getElementById("list");

let LIST, id;

let data = localStorage.getItem("TODO");

//create a list for my data
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.deadline, item.trash);
  });
}

const vals = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

//to display the current date
dateElement.innerHTML = today.toLocaleDateString("en-US", vals);

function addToDo(toDo, id, done, deadline, trash) {
  if (trash) {
    return;
  }

  //html code that will appear on the page
  const item = `
      <li class="item">
          <label class="check">
          <input type= "checkbox" job="complete" id="${id}"></i> </label>
          <p class = "text">${toDo}</p>
          <p class = "priority">${deadline}</p>
          <i class= "fas fa-trash-alt trashPlacing" job="delete" id="${id}" fa-lg></i>
      </li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

const submit = function(e) {
  e.preventDefault();

  var deadline;
  var date = new Date();
  var timestamp = date.getTime();

  const input = document.querySelector("#input"),
    priority = document.querySelector("#priority"),
    json = {
      input: input.value,
      priority: priority.value,
      timestamp: timestamp
    }, //what I want on the server
    body = JSON.stringify(json),
    toDo = input.value;

  var p = priority.value;
  var d;

  //convert sting priority value to number value
  if (p === "1") {
    var d = 1;
  } else if (p === "2") {
    var d = 2;
  } else if (p === "3") {
    var d = 3;
  }

  if (d === 1) {
    deadline = "1 more day!";
  } else if (d === 2) {
    deadline = "3 days left";
  } else if (d === 3) {
    deadline = "1 week left";
  } else {
    deadline = "N/A";
  }

  //push to the list
  if (toDo) {
    addToDo(toDo, id, false, deadline, false);
    LIST.push({
      name: toDo,
      id: id,
      done: false,
      deadline,
      trash: false
    });

    id++;
    localStorage.setItem("TODO", JSON.stringify(LIST));

    //clear input values
    input.value = "";
    priority.value = "";
  }

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      // do something with the reponse
      return response.json();
    })
    .then(function(json) {
      console.log(json);
    });

  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

//trash functionality
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});
