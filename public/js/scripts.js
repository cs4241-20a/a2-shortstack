// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const CHECK = "fas fa-check-circle";

document.getElementById("add").addEventListener("click", toDoList);

function toDoList() {
  let item = document.getElementById("toDoInput").value;
  let text = document.createTextNode(item);
  let newListItem = document.createElement("li");
  newListItem.appendChild(text);
  document.getElementById("toDoList").appendChild(newListItem);

  let item2 = document.getElementById("priority").value;
  let text2 = document.createTextNode(item2);
  let newListItem2 = document.createElement("li");
  newListItem2.appendChild(text2);
  document.getElementById("priorityList").appendChild(newListItem2);

  let item3 = document.getElementById("chosenDate").value;
  let text3 = document.createTextNode(item3);
  let newListItem3 = document.createElement("li");
  newListItem3.appendChild(text3);
  document.getElementById("dateList").appendChild(newListItem3);
}

let priorityArr = [];

function highFcn() {
  priorityArr.push(1);
}

function medFcn() {
  priorityArr.push(2);
}

function lowFcn() {
  priorityArr.push(3);
}

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#toDoInput"),
    input2 = document.querySelector("#priority"),
    input3 = document.querySelector("#chosenDate"),
    json = { toDoInput: input.value, priority: input2.value, chosenDate: input3.value },
    body = JSON.stringify(json);

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
