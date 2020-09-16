// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

let today = new Date();
let todoItems = [];
let undoList = document.getElementById("undoList");

let displayTable = document.getElementById("displayTable");

document.getElementById("date").innerHTML = today.getDate();

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
document.getElementById("dateOfWeek").innerHTML = week[today.getDay()];

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#todo");
  const duration = document.querySelector("#duration");
  
  console.log(input);

  if (input.value == "" || duration.value =="") {
    alert("Please input a Value");
    return false;
  }
  let dueDate = new Date();
  console.log(today);
  dueDate.setDate(today.getDate() + parseInt(duration.value));
  console.log(dueDate);
  const json = { date: dueDate.getDate(), todo: input.value };
  const body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      json = JSON.parse(json);
      undoList.innerHTML += "<li>" + json[json.length - 1].todo + "</li>";

      insertTable(json[json.length - 1].todo, json[json.length - 1].date);
    });

  return false;
};

const insertTable = function(todo, date) {
  let newRow = displayTable.insertRow(-1);
  newRow.insertCell(-1).innerHTML = "";
  newRow.insertCell(-1).innerHTML = "";
  newRow.insertCell(-1).innerHTML = todo;
  newRow.insertCell(-1).innerHTML = date;
  newRow.insertCell(-1).innerHTML = "";
};

window.onload = function() {
  fetch("/init", {
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      for (var x of json) {
        var y = JSON.parse(x);
        console.log(y);
        undoList.innerHTML += "<li>" + y.todo + "</li>";
        insertTable(y.todo, y.date);
      }
    });

  const button = document.querySelector("button");
  button.onclick = submit;
};
