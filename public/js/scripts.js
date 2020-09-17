const loadTable = function (jsonData) {
  var table = document.getElementById("resultTableBody");
  table.innerHTML = "";
  for (var i = 0; i < jsonData.length; i++) {
    var tr = table.insertRow(-1);
    for (var j in jsonData[i]) {
      var tb = tr.insertCell(-1);
      tb.innerHTML = jsonData[i][j];
    }
  }
};

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  //sanitize inputs here

  var inputRoute = document.querySelector("#inputRoute");
  var inputTime = document.querySelector("#inputTime");
  var inputDistance = document.querySelector("#inputDistance");
  if (inputRoute.value === "") {
    alert("Please input a route");
    return false;
  }
  if (inputTime.value === "") {
    alert("Please input a time in minutes");
    return false;
  }
  if (inputDistance.value === "") {
    alert("Please input a distance in miles");
    return false;
  }

  const json = {
      route: inputRoute.value,
      time: inputTime.value,
      distance: inputDistance.value,
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  })
    .then((response) => response.json())
    .then((jsonData) => loadTable(jsonData));

  return false;
};

window.onload = function () {
  fetch("/loadData", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((jsonData) => loadTable(jsonData));
  const button = document.querySelector("button");
  button.onclick = submit;
};
