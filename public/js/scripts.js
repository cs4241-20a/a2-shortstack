const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    console.log("NEW ITEM IS: " + document.querySelector('#newitem').value);
    if (document.querySelector('#newitem').value === '') {
        alert("You need to input a task!");
    } else if ((parseInt(document.querySelector('#priority').value) > 5) || (parseInt(document.querySelector('#priority').value) < 1) || (document.querySelector('#priority').value === '')) {
        alert("You need to enter a priority number that is 1-5!");
    } else if (document.querySelector('#assigneddate').value === '') {
        alert("You need to enter a day that this task was assigned!");
    } else {

        const task = document.querySelector('#newitem')
        const priority = document.querySelector('#priority')
        const assigneddate = document.querySelector('#assigneddate'),
            json = {
                newitem: task.value,
                priority: priority.value,
                assigneddate: assigneddate.value
            },
            body = JSON.stringify(json)

        console.log("BODY is here: " + body)

        fetch('/submit', {
                method: 'POST',
                body
            }).then(response => response.json())
            .then(data => {
                console.log(data[data.length - 2]);
                newElement(data[data.length - 2])
            });
    }

    return false
}


function deleteTheRow(r) {
    var i = r.rowIndex;
    document.getElementById("todo-list").deleteRow(i);
}


//adds new row to table with newest task
function newElement(response) {

    var table = document.getElementById("todo-list");
    var newitem = document.querySelector("#newitem").value;
    var newitem_priority = document.querySelector("#priority").value;
    var assigneddate = document.querySelector("#assigneddate").value;

    var rowCount = table.rowsCount;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = newitem;

    var cell2 = row.insertCell(1);
    cell2.innerHTML = newitem_priority;

    var cell3 = row.insertCell(2);
    var parts1 = assigneddate.split('-');
    var thedate1 = new Date(parts1[0], parts1[1] - 1, parts1[2]);
    cell3.innerHTML = thedate1.toDateString();

    var cell4 = row.insertCell(3);
    cell4.innerHTML = response.deadline;

    document.getElementById("newitem").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("assigneddate").value = "";
}



window.onload = function() {
    const button_submit = document.getElementById('new_item')
    button_submit.onclick = submit
}