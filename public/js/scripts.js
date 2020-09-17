const ACTION_NONE = "none"
const ACTION_EDIT = "edit"
const ACTION_NEW = "new"
const ACTION_DELETE = "delete"

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const inputName = document.querySelector( '#nameInput' )
    const inputScore = document.querySelector( '#scoreInput' )
    const inputPossible = document.querySelector( '#possibleInput' )
    const json = { "inputName": inputName.value, "inputScore": inputScore.value, "inputPossible": inputPossible.value }
    const body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
        //console.log(response)
        return response.json()
    })
    .then( function( json ) {
      console.log( "Total: " + json.total)
      
      const table = document.querySelector("#data_display");
      const messagebox = document.querySelector("#message_box")
      const totalbox = document.querySelector("#total_box")
      
      messagebox.innerHTML = json.message
      totalbox.innerHTML = "Overall score: " + json.total + "%"
      
      for (let i = table.rows.length-1; i > 0 ; i--) {
        table.deleteRow(i)
      }
      for (let i = 0; i < json.grades.length; i++) {  
        addtoTable( table, json.grades[i] )
      }
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submitter' )
    button.onclick = submit
  }

  function addtoTable( table, assignment ) {
    const row = table.insertRow(table.length)
    const c1 = row.insertCell(0)
    const c2 = row.insertCell(1)
    const c3 = row.insertCell(2)
    const c4 = row.insertCell(3)
    c1.innerHTML = assignment.assignName
    c2.innerHTML = assignment.assignScore
    c3.innerHTML = assignment.assignPossible
    c4.innerHTML = assignment.percent
  }