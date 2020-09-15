var counter = 0;
//Add some Javascript code here, to run on the front end.

const addToTable = function(data){
  console.log(data);
  //   var table = document.createElement("table");
  //   var row = table.insertRow();
  //   var cell = row.insertCell();
  //   console.log(String(data));
  //   cell.innerHTML = String(data);
  // document.getElementById("resultsTable").appendChild(table) //this part did not work, it said that the element was null, so I just printed the results to console
}

const showQuizResult = function(quizAnswers) {
  switch (quizAnswers.result) {
    case "lake":
      document.getElementById("lakeResult").style.visibility = "visible";
      document.getElementById("beachResult").style.visibility = "hidden";
      document.getElementById("springResult").style.visibility = "hidden";
      document.getElementById("waterfallResult").style.visibility = "hidden";
      break;
    case "beach":
      document.getElementById("beachResult").style.visibility = "visible";
      document.getElementById("lakeResult").style.visibility = "hidden";
      document.getElementById("springResult").style.visibility = "hidden";
      document.getElementById("waterfallResult").style.visibility = "hidden";
      break;
    case "spring":
      document.getElementById("springResult").style.visibility = "visible";
      document.getElementById("lakeResult").style.visibility = "hidden";
      document.getElementById("beachResult").style.visibility = "hidden";
      document.getElementById("waterfallResult").style.visibility = "hidden";
      break;
    case "waterfall":
      document.getElementById("waterfallResult").style.visibility = "visible";
      document.getElementById("lakeResult").style.visibility = "hidden";
      document.getElementById("springResult").style.visibility = "hidden";
      document.getElementById("beachResult").style.visibility = "hidden";
      break;
  }
};

const getResult = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#quizResults"),
    json = {
      yourname: input.yourname.value,
      color: input.color.value,
      quote: input.quote.value,
      place: input.place.value,
      season: input.season.value
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      showQuizResult(json[counter]);
      addToTable(json);
      counter++;
    });
  return false;
};

window.onload = function() {
  const button = document.querySelector("#getResult");
  button.onclick = getResult;
};
