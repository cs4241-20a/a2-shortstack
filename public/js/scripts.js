let action = "add"

const addPlayer = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  action = "add"

  const numberInput = document.querySelector( '#number' ),
        firstNameInput = document.querySelector( '#firstName' ),
        lastNameInput = document.querySelector( '#lastName' ),
        goalsInput = document.querySelector( '#goals' ),
        assistsInput = document.querySelector( '#assists' ),
        
        json = { playerAction: action, number: numberInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value, goals: goalsInput.value, assists: assistsInput.value },
        body = JSON.stringify( json );

  fetch( '/addPlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt){
      console.log(txt)
      addRoster(table, JSON.parse(txt))
  })

  return false
}

const deletePlayer = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  action = "delete"

  const numberInput = document.querySelector( '#number' ),
        firstNameInput = document.querySelector( '#firstName' ),
        lastNameInput = document.querySelector( '#lastName' ),
        goalsInput = document.querySelector( '#goals' ),
        assistsInput = document.querySelector( '#assists' ),
        
        json = { playerAction: action, number: numberInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value, goals: goalsInput.value, assists: assistsInput.value },
        body = JSON.stringify( json );

  fetch( '/deletePlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt){
      console.log(txt)
      deleteRoster()
  })

  return false
}

const editPlayer = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  action = "edit"

  const numberInput = document.querySelector( '#number' ),
        firstNameInput = document.querySelector( '#firstName' ),
        lastNameInput = document.querySelector( '#lastName' ),
        goalsInput = document.querySelector( '#goals' ),
        assistsInput = document.querySelector( '#assists' ),
        
        json = { playerAction: action, number: numberInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value, goals: goalsInput.value, assists: assistsInput.value },
        body = JSON.stringify( json );

  fetch( '/editPlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt){
      console.log(txt)
      editRoster(txt)
  })

  return false
}

let numRows = 1

function addRoster = function(data){
    var table = document.getElementById("resultTable")
    var newRow = table.insertRow(-1);
    var numberCell = newRow.insertCell(0);
    var firstNameCell = newRow.insertCell(1);
    var lastNameCell = newRow.insertCell(2);
    var goalsCell = newRow.insertCell(3);
    var assistsCell = newRow.insertCell(4);

    numberCell.innerHTML = data.number;
    firstNameCell.innerHTML = data.firstName;
    lastNameCell.innerHTML = data.lastName;
    goalsCell.innerHTML = data.goals;
    assistsCell.innerHTML = data.assists;
    numRows++
}

function deleteRoster(){
  console.log("Deleting last player")
  if(numRows !== 1){
    document.getElementById("resultTable").deleteRow(-1);
    numRows--
  }
  return false
}

function editRoster(array){
  for(var r = 0; r < array.length; r++){
    var table = documenet.getElementById("resultTable")
    table.rows[r+1].cells[0].innerHTML = array[r].number
    table.rows[r+1].cells[1].innerHTML = array[r].firstName
    table.rows[r+1].cells[2].innerHTML = array[r].lastName
    table.rows[r+1].cells[3].innerHTML = array[r].goals
    table.rows[r+1].cells[4].innerHTML = array[r].assists

  }
  return false
}

window.onload = function() {
  const addButton = document.querySelector( '#add' )
  addButton.onclick = addPlayer

  const deleteButton = document.querySelector( '#delete' )
  deleteButton.onclick = deletePlayer

  const editButton = document.querySelector( '#edit' )
  editButton.onclick = editPlayer

  /* const table = document.querySelector( '#resultTable' )
  fetch( '/appData' )
  .then( function( response ){
      return response.json()
  })
  .then( function( array ){
      console.log( array );
      array.forEach( element => updateRoster( table, JSON.parse( element ) ) )
  }) */
}
