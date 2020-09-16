var allData = [
  {
    name: "Nicole Conill",
    bikenumber: "13",
    bikebrand: "KTM",
    classes: "female",
    racelaps: "5"
  },
  {
    name: "Chris Lauro",
    bikenumber: "334",
    bikebrand: "KTM",
    classes: "twofiftypro",
    racelaps: "9"
  },
  {
    name: "Joshua Berchem",
    bikenumber: "719",
    bikebrand: "KTM",
    classes: "fourfiftypro",
    racelaps: "9"
  }
];

const submit = function(e) {
  let i;
  // prevent default form action from being carried out
  e.preventDefault();

  const name = document.querySelector("#name").value,
    bikenumber = document.querySelector("#bikenumber").value,
    bikebrand = document.getElementsByName("brand"),
    classes = document.getElementsByName("classes");

  let bikebrandValue = null;
  for (i = 0; i < bikebrand.length; i++) {
    if (bikebrand[i].checked) {
      bikebrandValue = bikebrand[i].value;
      break;
    }
  }

  let classesValue = null;
  for (i = 0; i < classes.length; i++) {
    if (classes[i].checked) {
      classesValue = classes[i].value;
      break;
    }
  }

  if (!name || !bikenumber || !bikebrandValue || !classesValue) {
    alert("All fields are required to submit a new race entry.");
  } else {
    const json = {
        name: name,
        bikenumber: bikenumber,
        bikebrand: bikebrandValue,
        classes: classesValue
      },
      body = JSON.stringify(json);
    fetch("/submit", {
      method: "POST",
      body
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        allData.push(JSON.parse(text));
        updateTable();
        console.log(allData);
      });
  }
  document.querySelector("#name").value = "";
  document.querySelector("#bikenumber").value = "";
  document.querySelector("#honda").checked = false;
  document.querySelector("#husqvarna").checked = false;
  document.querySelector("#kawasaki").checked = false;
  document.querySelector("#ktm").checked = false;
  document.querySelector("#suzuki").checked = false;
  document.querySelector("#yamaha").checked = false;
  document.querySelector("#fiftycc").checked = false;
  document.querySelector("#sixtyfivecc").checked = false;
  document.querySelector("#eightyfivecc").checked = false;
  document.querySelector("#supermini").checked = false;
  document.querySelector("#youth").checked = false;
  document.querySelector("#twofiftypro").checked = false;
  document.querySelector("#twofifty").checked = false;
  document.querySelector("#fourfiftypro").checked = false;
  document.querySelector("#fourfifty").checked = false;
  document.querySelector("#open").checked = false;
  document.querySelector("#twentyfive").checked = false;
  document.querySelector("#thirty").checked = false;
  document.querySelector("#forty").checked = false;
  document.querySelector("#fortyfive").checked = false;
  document.querySelector("#fifty").checked = false;
  document.querySelector("#fiftyfive").checked = false;
  document.querySelector("#sixty").checked = false;
  document.querySelector("#female").checked = false;
  return false;
};

window.onload = function() {
  const subBut = document.querySelector("#submit");
  subBut.onclick = submit;
  updateTable();
};

const del = function(e) {
  e.preventDefault();
  console.log("Delete");
  allData.splice(Number(e.target.id.substring(1)), 1);
  updateTable();
};

const mod = function(e) {
  e.preventDefault();
  console.log("Edit");

  let obj = allData[Number(e.target.id.substring(1))];
  document.querySelector("#name").value = obj.name;
  document.querySelector("#bikenumber").value = obj.bikenumber;

  document.querySelector("#honda").checked = false;
  document.querySelector("#husqvarna").checked = false;
  document.querySelector("#kawasaki").checked = false;
  document.querySelector("#ktm").checked = false;
  document.querySelector("#suzuki").checked = false;
  document.querySelector("#yamaha").checked = false;
  document.querySelector("#" + obj.bikebrand).checked = true;

  document.querySelector("#fiftycc").checked = false;
  document.querySelector("#sixtyfivecc").checked = false;
  document.querySelector("#eightyfivecc").checked = false;
  document.querySelector("#supermini").checked = false;
  document.querySelector("#youth").checked = false;
  document.querySelector("#twofiftypro").checked = false;
  document.querySelector("#twofifty").checked = false;
  document.querySelector("#fourfiftypro").checked = false;
  document.querySelector("#fourfifty").checked = false;
  document.querySelector("#open").checked = false;
  document.querySelector("#twentyfive").checked = false;
  document.querySelector("#thirty").checked = false;
  document.querySelector("#forty").checked = false;
  document.querySelector("#fortyfive").checked = false;
  document.querySelector("#fifty").checked = false;
  document.querySelector("#fiftyfive").checked = false;
  document.querySelector("#sixty").checked = false;
  document.querySelector("#female").checked = false;
  document.querySelector("#" + obj.classes).checked = true;

  allData.splice(Number(e.target.id.substring(1)), 1);
  updateTable();
};

function updateTable() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < allData.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      let text;
      switch (j) {
        case 0:
          text = document.createTextNode(allData[i].name);
          break;
        case 1:
          text = document.createTextNode(allData[i].bikenumber);
          break;
        case 2:
          text = document.createTextNode(allData[i].bikebrand);
          break;
        case 3:
          text = document.createTextNode(allData[i].classes);
          break;
        case 4:
          text = document.createTextNode(allData[i].racelaps);
          break;
        case 5:
          text = document.createElement("Button");
          break;
        case 6:
          text = document.createElement("Button");
          break;
      }
      if (j === 5) {
        text.innerHTML = "Edit";
        text.id = "E" + i.toString();
        text.onclick = mod;
      }

      if (j === 6) {
        text.innerHTML = "Delete";
        text.id = "D" + i.toString();
        text.onclick = del;
      }
      cell.appendChild(text);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}
