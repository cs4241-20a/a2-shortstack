const submit = function( e ) {
    document.getElementById("habitView").innerHTML = "";

    // prevent default form action from being carried out
    e.preventDefault()

    const habit = document.querySelector( '#task' ),
          weeks = document.querySelector( '#weeks' ),
          json = { habit_name: habit.value, weeks:  weeks.value},
          body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            // do something with the reponse
            return response.json()
        }).then(function ( json ) {
        let habitView = document.getElementById("habitView")
        for(let i = 0; i<json.length; i++){
            let div = document.createElement("div")
            div.id = "habit_"+i
            div.className = "habitBlock"
            let spanE =  document.createElement("span")
            spanE.className = "habitName"
            let title = document.createTextNode(JSON.parse(json[i]).habit_name)
            spanE.appendChild(title)
            div.appendChild(spanE)
            habitView.appendChild(div)
            generateTable(JSON.parse(json[i]).weeks, div.id, JSON.parse(json[i]).days)
            let delBtn = document.createElement("button")
            div.appendChild(delBtn)
            delBtn.innerText = "Delete"
            delBtn.className = "delBtns"
            delBtn.id = "delBtn_" + i
            delBtn.onclick = deleteFunc
        }
    })

    return false
}

const editFunc = function (e) {
    e.preventDefault();

}

const deleteFunc = function(e){
    document.getElementById("habitView").innerHTML = "";
    let json = {habit: e.target.getAttribute("id").split("_")[1]}
    fetch( '/delete', {
        method:'POST',
        body: JSON.stringify(json)
    })
        .then( function( response ) {
            return response.json()
        }).then(function ( json ) {
        let habitView = document.getElementById("habitView")
        for(let i = 0; i<json.length; i++){
            let div = document.createElement("div")
            div.id = "habit_"+i
            div.className = "habitBlock"
            let spanE =  document.createElement("span")
            spanE.className = "habitName"
            let title = document.createTextNode(JSON.parse(json[i]).habit_name)
            spanE.appendChild(title)
            div.appendChild(spanE)
            habitView.appendChild(div)
            generateTable(JSON.parse(json[i]).weeks, div.id, JSON.parse(json[i]).days)
            let delBtn = document.createElement("button")
            div.appendChild(delBtn)
            delBtn.innerText = "Delete"
            delBtn.className = "delBtns"
            delBtn.id = "delBtn_" + i
            delBtn.onclick = deleteFunc
        }
    })
}
window.onload = function() {
    const submitBtn = document.querySelector( '#submitBtn' )
    submitBtn.onclick = submit
    /*fetch( '/getHabits', {
        method:'GET',
        body
    }).then((response) =>response.json()).then((json)=> processHabits(json));
*/
}

const processHabits = function(json){
    console.log(json)
}

const generateTable = function(rowNum, id, days){
    console.log(id)
    let habitBlock = document.getElementById(id),
        table = document.createElement("table")
    for(let i = 0; i<rowNum; i++){
        let row = table.insertRow();
        for(let j = 0; j< 7; j++){
            let cell = row.insertCell();
            let text = document.createTextNode(days[i][j])
            cell.appendChild(text)
        }

        table.appendChild(row);
    }
    habitBlock.appendChild(table)

}