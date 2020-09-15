const addPlayer = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const numberInput = document.querySelector( '#number' ),
        firstNameInput = document.querySelector( '#firstName' ),
        lastNameInput = document.querySelector( '#lastName' ),
        goalsInput = document.querySelector( '#goals' ),
        assistsInput = document.querySelector( '#assists' ),
        
        table = document.querySelector( '#resultTable'),
        json = { number: numberInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value, goals: goalsInput.value, assists: assistsInput.value },
        body = JSON.stringify( json );

  fetch( '/addPlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.text()
  })
  .then( function(txt){
      console.log(txt)
      updateRoster(table, JSON.parse(txt))
  })

  return false
}

const updateRoster = function(table, data){
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
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = addPlayer

  const table = document.querySelector( '#resultTable' )
  fetch( '/appData' )
  .then( function( response ){
      return response.json()
  })
  .then( function( array ){
      console.log( array );
      array.forEach( element => updateRoster( table, JSON.parse( element ) ) )
  })
}
