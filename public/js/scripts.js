
const processJSON = (json) => {
    console.log(json)
    const creatures = document.getElementById("creatures");
    creatures.innerHTML = "";
    json.forEach((creature) => {
        creatures.innerHTML += `
        <tr>
            <td>${
            creature.name}
            </td>
            <td>${
            creature.num}
            </td>
        </tr>`
    })
}
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector( '#name' )
    const num = document.querySelector( '#initiative' )

    const json = {name: name.value, num: num.value }
    const body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json()) 
    .then( resjson => processJSON(resjson))

    // clear inputs

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

    fetch('/appData')
    .then(response => response.json())
    .then(json => processJSON(json));
  }
