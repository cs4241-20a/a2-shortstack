// Add some Javascript code here, to run on the front end.

var allData = [{ name: 'Jialin Song', email: 'jsong@wpi.edu', title: 'under',
    space: 'both', date: '2020-10-19', ftime: '18:20', ttime: '20:20',
    time: '120'}];

const submit = function( e ) {
    let i;
// prevent default form action from being carried out
    e.preventDefault();

    const name = document.querySelector( '#name').value,
          email = document.querySelector('#mail').value,
          space = document.getElementsByName("checkbox"),
          title = document.getElementsByName("radio"),
          date = document.querySelector('#date').value,
          ftime = document.querySelector('#ftime').value,
          ttime = document.querySelector('#ttime').value,
          currDate = new Date(currentDate());

    let titleValue = null, spaceValue = null, sdate = new Date(date);
    for(i = 0; i < title.length; i++){
        if(title[i].checked){
            titleValue = title[i].value;
            break
        }
    }
    if(space[0].checked && space[1].checked){
        spaceValue = "both"
    }else if(space[0].checked){
        spaceValue = space[0].value;
    }else if(space[1].checked) {
        spaceValue = space[1].value;
    }

    if(!name || !email || !spaceValue || !titleValue || !date || !ftime || !ttime){
        alert("Please fill in all fields in order to submit!")
    }else if(sdate < currDate ||  ttime <= ftime){
        alert("Dates or Time Slot Incorrect (passes date or starting time later than ending time) :(")
    }else if(sdate.getFullYear() === currDate.getFullYear() && sdate.getDate() === currDate.getDate()
        && sdate.getMonth() === currDate.getMonth() && (checkTime(ttime) || checkTime(ftime))){
        alert("Cannot schedule on passed time slots :(")
    }else{
        const json = { name:name, email:email, title:titleValue,  space:spaceValue,
                date:date, ftime:ftime, ttime:ttime},
            body = JSON.stringify( json );
        fetch( '/submit', {
            method:'POST',
            body
        }).then( function( response ) {
                return response.text();
            }).then(function (text) {
                allData.push(JSON.parse(text));
                updateTable();
                console.log(allData);
            });
        }
    return false
};

window.onload = function() {
    const subBut = document.querySelector( '#submit' );
    subBut.onclick = submit;
    updateTable();
};


const del = function(e){
    e.preventDefault();
    console.log('Delete');
    allData.splice(Number(e.target.id.substring(1)),1);
    updateTable();
};

const mod = function (e) {
    e.preventDefault();
    console.log('Modify');
    let obj = allData[Number(e.target.id.substring(1))];
    document.querySelector('#name').value = obj.name;
    document.querySelector('#mail').value = obj.email;
    document.querySelector('#date').value = obj.date;
    document.querySelector('#ftime').value = obj.ftime;
    document.querySelector('#ttime').value = obj.ttime;
    for(let rad in document.getElementsByName('radio')){
        rad.checked = false;
    }
    document.querySelector('#' + obj.title).checked = true;
    for(let check in document.getElementsByName('checkbox')){
        check.checked = false;
    }

    if (obj.space === "both") {
        document.querySelector('#norm').checked = true;
        document.querySelector('#exp').checked = true;
    } else {
        document.querySelector('#' + obj.space).checked = true;
    }

    alert("All fields are automatically filled. Please hit 'Submit' when you finish modify information.");
    allData.splice(Number(e.target.id.substring(1)),1);
    updateTable();
};

function  currentDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

function checkTime(time){
    let date = new Date(),
        currHr = date.getHours(),
        currMin = date.getMinutes(),
        hr = Number(time.substring(0,2)),
        min = Number(time.substring(3));
    return (currHr > hr) || (currHr === hr && currMin > min);
}

function updateTable(){
    let tbody = document.querySelector("tbody");
    tbody.innerHTML="";
    for (let i = 0; i < allData.length; i++){
        let row = document.createElement("tr");
        for(let j = 0; j < 10; j++){
            let cell = document.createElement("td");
            let text;
            switch (j) {
                case 0: text = document.createTextNode(allData[i].name); break;
                case 1: text = document.createTextNode(allData[i].email); break;
                case 2: text = document.createTextNode(allData[i].title); break;
                case 3: text = document.createTextNode(allData[i].space); break;
                case 4: text = document.createTextNode(allData[i].date); break;
                case 5: text = document.createTextNode(allData[i].ftime); break;
                case 6: text = document.createTextNode(allData[i].ttime); break;
                case 7: text = document.createTextNode(allData[i].time); break;
                case 8: text = document.createElement("Button"); break;
                case 9: text = document.createElement("Button"); break;
            }
            if(j === 8){
                text.innerHTML = "Modify";
                text.id = 'M' + i.toString();
                text.onclick = mod;
            }

            if(j === 9){
                text.innerHTML = "Delete";
                text.id = 'D' + i.toString();
                text.onclick = del;
            }
            cell.appendChild(text);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}
