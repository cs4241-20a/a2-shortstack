// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )
          console.log( "client: " + body )

    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
        //console.log(response)
        return response.text()
    })
    .then( function( json ) {
        console.log( json )
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submitter' )
    button.onclick = submit
  }