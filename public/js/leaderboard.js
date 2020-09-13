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
    let table = document.getElementById("data_table");

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
    });
}

function addEntry(entry, value) {
    let new_data = document.createElement("TD");
    new_data.innerHTML = value;

    entry.appendChild(new_data);
}