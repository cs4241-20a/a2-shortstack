// Add some Javascript code here, to run on the front end.

//console.log("Welcome to assignment 2!")

"use strict";

//Takes a json object and adds it to the table as a row
function generateRows(jsonobj) {
    //Find the table
    const tableBody = document.getElementById("tableBody");
    //Insert a new row and then new cells
    let row = tableBody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    //Fill those cells with the data gotten back from the server, this includes the new fields
    cell1.innerHTML = jsonobj.yourtask;
    cell2.innerHTML = jsonobj.priority;
    cell3.innerHTML = jsonobj.creationdate;
}