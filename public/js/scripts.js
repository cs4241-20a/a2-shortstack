const submit = function( e ) {
    document.getElementById("habitView").innerHTML = "";

    // prevent default form action from being carried out
    e.preventDefault()

    const habit = document.querySelector( '#task' ),
        weeks = document.querySelector( '#weeks' )
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
        for(let i = 0; i<json.length; i++){
            generateTable(JSON.parse(json[i]).weeks)
        }
    })

    return false
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

const generateTable = function(rowNum){
    let habitView = document.getElementById("habitView"),
        table = document.createElement("table")
    for(let i = 0; i<rowNum; i++){
        let row = table.insertRow();
        for(let j = 0; j< 7; j++){
            let cell = row.insertCell();
            let text = document.createTextNode("X")
            cell.appendChild(text)
        }

        table.appendChild(row);
    }
    habitView.appendChild(table)

}