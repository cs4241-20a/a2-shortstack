let table = document.getElementById("data_table");

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    let dataJSON = JSON.parse(xhttp.responseText);
    console.log(dataJSON);
    createTable(dataJSON);
  }
};
xhttp.open("GET", "data", true);
xhttp.send();

function createTable(dataJSON) {
  table.innerHTML = "";

  dataJSON.forEach((element, place) => {
    let entry = document.createElement("TR");

    table.appendChild(entry);

    addEntry(entry, "P" + (place + 1));

    addEntry(entry, element.cname);
    addEntry(entry, element.dname);
    addEntry(entry, element.pname);

    let time_seconds = element.ltime;

    let minutes = Math.floor(time_seconds / 60);
    let seconds = time_seconds - minutes * 60;

    addEntry(entry, minutes + ":" + seconds.toFixed(3));

    addEntry(entry, element.sdate);

    let remove_td = document.createElement("TD");
    let remove_button = document.createElement("button");

    remove_button.innerText = "Invalidate Lap";
    remove_button.classList.add(
      "button",
      "is-small",
      "is-rounded",
      "is-danger"
    );
    remove_button.id = element.id;

    remove_button.addEventListener("click", () =>
      removeEntry(entry, element.id)
    );

    remove_td.appendChild(remove_button);
    entry.appendChild(remove_td);
  });
}

function removeEntry(entry, lapID) {
  console.log("Request to remove " + lapID);

  fetch("/remove", {
    method: "POST",
    body: JSON.stringify({
      lapID,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createTable(data);
    });
}

function addEntry(entry, value) {
  let new_data = document.createElement("TD");
  new_data.innerHTML = value;

  entry.appendChild(new_data);
}
