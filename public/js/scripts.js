const loadTable = function(jsonData){

}

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const inputRoute = document.querySelector("#inputRoute"),
    inputTime = document.querySelector("#inputTime"),
    inputDistance = document.querySelector("#inputDistance"),
    json = {
      route: inputRoute.value,
      time: inputTime.value,
      distance: inputDistance.value,
      pace: "",
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    loadTable(JSON.parse(response))
  });

  return false;
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
