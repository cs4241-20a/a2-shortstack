const addPlayer = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const number = document.querySelector( '#number' ),
        firstName = document.querySelector( '#firstName' ),
        lastName = document.querySelector( '#lastName' ),
        goals = document.querySelector( '#goals' ),
        table = document.querySelector( '#resultTable'),
        assists = document.querySelector( '#assists' ),
        json = { number: number.value, firstName: firstName.value, lastName: lastName.value, goals: goals.value, assists: assists.value },
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

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = addPlayer
}
