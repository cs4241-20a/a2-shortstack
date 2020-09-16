
const processJSON = (json) => {
    //console.log(json)
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
            <td>${
                creature.hp}
            </td>
            <td>${
                creature.ac}
            </td>
            <td><button class="moveUp" id="${creature.id}">
                ^</button>
            </td>
            <td><button class="moveDown" id="${creature.id}">
                v</button>
            </td>
            <td><button class="delete" id="${creature.id}">
                Remove</button>
            </td>
        </tr>`
    })
}
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const checkbox = document.getElementById('roll')
    const initiative = document.querySelector( '#initbonus')

    // handle initiative
    var init;
    if(checkbox.checked) {
        // Roll their initiative

        init = parseInt(initiative.value) + getRandomInt(20)

    } else {
        // their initiative is what was entered.
        init = document.querySelector( '#initiative' ).value
    }

    // get rest of fields
    const name = document.querySelector( '#name' )
    const hp = document.querySelector( '#hp')
    const ac = document.querySelector( '#ac')

    const json = {name: name.value, num: init, ac:ac.value, hp:hp.value }
    const body = JSON.stringify( json )
    //console.log(json)

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json()) 
    .then( resjson => processJSON(resjson))

    // clear inputs
    name.value = ""
    initiative.value = 0
    hp.value = 0
    ac.value = 0

    return false
  }

const removeCreature = function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("id");

    const json = {delete: 'delete', id},
        body = JSON.stringify(json);

        fetch('/submit', {
            method:'POST',
            body,
        })
        .then(response => response.json())
        .then( resjson => processJSON(resjson))
}

const moveCreature = function (e, dir) {
    e.preventDefault();
    const id = e.target.getAttribute("id");

    const json = {movedir: dir, id},
        body = JSON.stringify(json);

        fetch('/submit', {
            method:'POST',
            body,
        })
        .then(response => response.json())
        .then( resjson => processJSON(resjson))
}

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

    fetch('/appData')
    .then(response => response.json())
    .then(json => processJSON(json));
  }

  document.addEventListener("click", function (e) {
      if(e.target && e.target.classList[0] == "delete") {
          removeCreature(e)
      }
      if(e.target && e.target.classList[0] == "moveUp") {
          moveCreature(e, -1)
      }
      if(e.target && e.target.classList[0] == "moveDown") {
          moveCreature(e, 1)
      }
  })

  function switchRoll() {
      var checkBox = document.getElementById("roll");
      var bonus = document.getElementById("initbonusBox")
      var init = document.getElementById("initiativeBox")
      if(checkBox.checked == true) {
          init.style.display = "none"
          bonus.style.display = "block"
      } else {
          bonus.style.display = "none"
          init.style.display = "block"

      }
  }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1
    }