const submit = function (e) {
    document.getElementById("habitView").innerHTML = "";

    // prevent default form action from being carried out
    e.preventDefault()

    const habit = document.querySelector('#task'),
        weeks = document.querySelector('#weeks'),
        date = (new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+ "-" + (new Date()).getDate(),
        json = {habit_name: habit.value, weeks: weeks.value, startDate: date},
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            // do something with the reponse
            return response.json()
        }).then(function (json) {
        generateHabitArea(json)
    })

    return false
}

const editFunc = function (e) {
    document.getElementById("habitView").innerHTML = "";
    let thisID = e.target.getAttribute("id")
    let json = {
        habit: thisID.split("_")[1],
        row: thisID.split("_")[2],
        col: thisID.split("_")[3],
        val: e.target.innerText
    }
    e.preventDefault();
    fetch('/edit', {
        method: 'POST',
        body: JSON.stringify(json)
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        generateHabitArea(json)
    })
}

const deleteFunc = function (e) {
    document.getElementById("habitView").innerHTML = "";
    let json = {habit: e.target.getAttribute("id").split("_")[1]}
    fetch('/delete', {
        method: 'POST',
        body: JSON.stringify(json)
    })
        .then(function (response) {
            return response.json()
        }).then(function (json) {
        generateHabitArea(json)
    })
}
window.onload = function () {
    const submitBtn = document.querySelector('#submitBtn')
    submitBtn.onclick = submit
    fetch('/getData', {
        method: 'POST'
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        generateHabitArea(json)
    })
}

const generateTable = function (rowNum, id, days, weekday, startDate) {
    let habitBlock = document.getElementById(id),
        table = document.createElement("table")
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"]
    let row = table.insertRow()

    for(let i=0; i<weekdays.length; i++){
        let el = document.createElement("th");
        row.appendChild(el)
        el.innerText = weekdays[(parseInt(weekday)+i)%7]
    }
    table.appendChild(row)

    for (let i = 0; i < rowNum; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell();
            cell.className = "habitCell"
            cell.id = id + "_" + i + "_" + j
            cell.onclick = editFunc
            let text = document.createTextNode(days[i][j])
            cell.style.border = "solid white "
            switch (days[i][j]) {
                case "#" :
                    cell.style.backgroundColor = "#bfbfbf";
                    cell.style.color = "#bfbfbf"
                    break
                case "O":
                    cell.style.backgroundColor = "#92cd24";
                    cell.style.color = "#92cd24"
                    break;
                case "X":
                    cell.style.backgroundColor = "#dd432f";
                    cell.style.color = "#dd432f"
                    break;
                case "-":
                    cell.style.backgroundColor = "#fffa82";
                    cell.style.color = "#fffa82"
                    break;
            }
            cell.appendChild(text)
        }
        table.appendChild(row);
    }
    habitBlock.appendChild(table)

    startDate = new Date(startDate)
    let todayDate =  new Date()
    let endDate = new Date()
    endDate.setTime(startDate.getTime())
    endDate.setDate(startDate.getDate()+(days.length*7))

    if(todayDate <= endDate && todayDate >= startDate){
        let daysPassed = Math.ceil((todayDate - startDate+1) / 86400000)
        let row = Math.floor(daysPassed/7)
        let col = daysPassed%7-1
        let todayCell = document.getElementById(id+"_"+row+"_"+col)
        todayCell.style.border = "solid #68696b"
    }
}

function generateHabitArea(json) {
    let habitView = document.getElementById("habitView")
    for (let i = 0; i < json.length; i++) {
        let div = document.createElement("div")
        div.id = "habit_" + i
        div.className = "habitBlock"
        let spanE = document.createElement("span")
        spanE.className = "habitName"
        let title = document.createTextNode(JSON.parse(json[i]).habit_name)
        spanE.appendChild(title)
        div.appendChild(spanE)
        habitView.appendChild(div)
        generateTable(JSON.parse(json[i]).weeks, div.id, JSON.parse(json[i]).days, JSON.parse(json[i]).weekday, JSON.parse(json[i]).startDate)
        let delBtn = document.createElement("button")
        div.appendChild(delBtn)
        delBtn.innerText = "Delete"
        delBtn.className = "delBtns"
        delBtn.id = "delBtn_" + i
        delBtn.onclick = deleteFunc
    }
}