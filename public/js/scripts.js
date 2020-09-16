// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

function parseDate(dateStr) {
  var date = dateStr.split("-");
  return new Date(date[2], date[0] - 1, date[1]);
}

function calcPrio(fdate, sdate) {
  var distance = Math.round((sdate - fdate) / (1000 * 60 * 60 * 24));
  if (distance >= 1 && distance <= 7) {
    return 10;
  } else if (distance >= 8 && distance <= 14) {
    return 9;
  } else if (distance >= 15 && distance <= 21) {
    return 8;
  } else if (distance >= 22 && distance <= 30) {
    return 7;
  } else if (distance >= 31 && distance <= 45) {
    return 6;
  } else if (distance >= 46 && distance <= 60) {
    return 5;
  } else if (distance >= 61 && distance <= 90) {
    return 4;
  } else if (distance >= 91 && distance <= 120) {
    return 3;
  } else if (distance >= 121 && distance <= 210) {
    return 2;
  } else if (distance >= 211) {
    return 1;
  } else {
    return "Error";
  }
}
function checkDateForm(str) {
  if (str.match("^[-0-9]")) {
    return true;
  } else {
    return false;
  }
}

function createDelete() {
  var deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = function() {
    deleteRow(this);
  };
  return deleteButton;
}

function deleteRow(row) {
  var index = row.parentNode.parentNode.rowIndex;
  document.getElementById("projectTable").deleteRow(index);
  console.log(row.parentNode.parentNode.innerHTML);
  var str = row.parentNode.parentNode.innerHTML;
  var pName, pDesc, pSDate, pEDate, pPrio, pButton;
  for (var i = 0; i < 6; i++) {
    if (i == 0) {
      var pName = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pName = pName.replace("<td>", "");
    } else if (i == 1) {
      var pDesc = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pDesc = pDesc.replace("<td>", "");
    } else if (i == 2) {
      var pSDate = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pSDate = pSDate.replace("<td>", "");
    } else if (i == 3) {
      var pEDate = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pEDate = pEDate.replace("<td>", "");
    } else if (i == 4) {
      var pPrio = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pPrio = pPrio.replace("<td>", "");
    } else if (i == 5) {
      var pButton = str.slice(str.indexOf("<td>"), str.indexOf("</td>"));
      pButton = pButton.replace("<td>", "");
    }
  }
  console.log(pName);
  console.log(pDesc);

  const json = {
      pName: pName,
      pDesc: pDesc,
      pSDate: pSDate,
      pEDate: pEDate,
      pPrio: pPrio,
      pButton: pButton
    },
    body = JSON.stringify(json);
  fetch("/delete", {
    method: "POST",
    body
  }).then(function(response) {
    console.log(response);
  });
}

function fillTable() {
  document.getElementById("status").innerHTML = "";
  if (
    !checkDateForm(document.getElementById("pSDate").value) ||
    !checkDateForm(document.getElementById("pEDate").value)
  ) {
    document.getElementById("status").innerHTML = "Invalid Date";
    console.log("error");
    return false;
  }
  var tableRef = document.getElementById("projectTable");
  var newRow = tableRef.insertRow();
  var prio;
  for (var i = 0; i < 6; i++) {
    var newCell = newRow.insertCell(i);
    if (i == 0) {
      var newText = document.createTextNode(
        document.getElementById("pName").value
      );
    } else if (i == 1) {
      var newText = document.createTextNode(
        document.getElementById("pDesc").value
      );
    } else if (i == 2) {
      var newText = document.createTextNode(
        document.getElementById("pSDate").value
      );
    } else if (i == 3) {
      var newText = document.createTextNode(
        document.getElementById("pEDate").value
      );
    } else if (i == 4) {
      var startDate = parseDate(document.getElementById("pSDate").value);
      var endDate = parseDate(document.getElementById("pEDate").value);
      prio = calcPrio(startDate, endDate);
      var newText = document.createTextNode(prio.toString());
    } else {
      var newText = createDelete();
    }
    newCell.appendChild(newText);
  }
  return prio;
}

function clearInput() {
  document.getElementById("pName").value = "";
  document.getElementById("pDesc").value = "";
  document.getElementById("pSDate").value = "";
  document.getElementById("pEDate").value = "";
}

function clearTable() {
  while (document.getElementById("projectTable").rows.length > 1) {
    document.getElementById("projectTable").deleteRow(1);
  }
}

function fillTableGet(contents) {
  var tableRef = document.getElementById("projectTable");
  var newRow = tableRef.insertRow();
  for (var i = 0; i < Object.keys(contents).length; i++) {
    var newCell = newRow.insertCell(i);
    if (i == 0) {
      var newText = document.createTextNode(contents.pName);
    } else if (i == 1) {
      var newText = document.createTextNode(contents.pDesc);
    } else if (i == 2) {
      var newText = document.createTextNode(contents.pSDate);
    } else if (i == 3) {
      var newText = document.createTextNode(contents.pEDate);
    } else if (i == 4) {
      var newText = document.createTextNode(contents.pPrio);
    } else {
      var newText = createDelete();
    }

    newCell.appendChild(newText);
  }
}

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();
  var end = fillTable();
  if (!end) {
    return;
  }

  const projectName = document.querySelector("#pName"),
    projectDesc = document.querySelector("#pDesc"),
    projectSDate = document.querySelector("#pSDate"),
    projectEDate = document.querySelector("#pEDate"),
    json = {
      pName: projectName.value,
      pDesc: projectDesc.value,
      pSDate: projectSDate.value,
      pEDate: projectEDate.value,
      pPrio: end.toString(),
      pButton: createDelete()
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  }).then(function(response) {
    // do something with the reponse
    console.log(response);
  });

  clearInput();

  return false;
};

const get = function(e) {
  fetch("/get", {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      clearTable();
      data.forEach(item => {
        fillTableGet(item);
      });
    });
  return false;
};

window.onload = function() {
  const subButton = document.querySelector("#submit");
  subButton.onclick = submit;
  const getButton = document.querySelector("#get");
  getButton.onclick = get;
};
