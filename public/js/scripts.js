// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

//checks if the date and time are valid format-wise (using regex)
const isValidInput = function() {
    const inputs = document.querySelectorAll('.birthdayFields'),
    dateRegex = /^\d{2}\/\d{2}\/\d{4}$/,
    timeRegex = /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/
    return dateRegex.test(inputs[1].value) && timeRegex.test(inputs[2].value)
}

//function that is called when user hits submit button on forum
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    if (!isValidInput()) {
        alert('Error: invalid input.')
        console.log('ERROR: invalid input')
        return false
    }
    const inputs = document.getElementsByClassName('birthdayFields'),
    json = {personname: inputs[0].value, personbirthday: inputs[1].value, remindertime: inputs[2].value},
    body = JSON.stringify(json)

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      return response.text()
    })
    .then( function (txt) {
        const parsedJson = JSON.parse(txt),
        tbody = document.querySelector('tbody')
        let i = tbody.childElementCount==0 ? 0 : parsedJson.length-1
        for(i; i<parsedJson.length; i++) {
            addTableData(parsedJson[i])
        }
    })
    return false
  }
  //this function populates table with server data. called whenever something is added or the page is refreshed.
  const addTableData = function(data) {
    const id = data["ID"],
      tbody = document.querySelector('tbody'),
      tr = document.createElement('tr')
    let x
    tbody.appendChild(tr)
    tr.classList.add('editable')
    let j = 0
    for(x in data) {
        if(j++ === 4) break //do not write id into table
        const td = document.createElement('td')
        td.innerText = data[x]
        tr.appendChild(td)
    }
    const td = document.createElement('td')
    td.classList.add('modify')
    const editInput = document.createElement('input')
    editInput.type = 'button'
    editInput.value = 'edit'
    td.appendChild(editInput)
    const delInput = document.createElement('input')
    delInput.type = 'button'
    delInput.value = 'del'
    td.appendChild(delInput)
    tr.appendChild(td)
    const cardInput = document.createElement('input')
    cardInput.type = 'button'
    cardInput.value = 'card'
    td.appendChild(cardInput)
    tr.onmouseover = function() {
        delInput.style.visibility = 'visible'
        editInput.style.visibility = 'visible'
        cardInput.style.visibility = 'visible'
    }
    tr.onmouseleave = function() {
        delInput.style.visibility = 'hidden'
        editInput.style.visibility = 'hidden'
        cardInput.style.visibility = 'hidden'
    }
    editInput.onclick = function() {
        if(editInput.value === 'edit') {
            tr.contentEditable = true;
            editInput.value = 'save'
        } else {
            tr.contentEditable = false;
            editInput.value = 'edit'
            pushEdit(id, tr)
            //update value in server
        }
    }
    delInput.onclick = function() {
        tbody.removeChild(tr)
        pushDel(id)
    }
    cardInput.onclick = function() {
        document.querySelector('#card').style.visibility = 'visible'
        document.querySelector('.cardSpan').innerText = data.personname
        location.href = "#card"
    }
  }
  //sends the edit to the server
  const pushEdit = function(id, modifiedTR) {
    const tds = modifiedTR.getElementsByTagName('td'),
    json = {personname: tds[0].innerText, personbirthday: tds[1].innerText, remindertime: tds[2].innerText, personage: tds[3].innerText, ID: id},
    body = JSON.stringify(json)
    fetch ('/submit', {
        method: 'POST',
        body
    }).then( function( response ) {
        console.log( response )
      })

  }
  //sends the deleted id to the server (so server can remove from list)
  const pushDel = function(id) {
    fetch ('/submit', {
        method: 'POST',
        body:'DEL' + id
    }).then(function(response) {
        console.log( response )
    })
  }
  //when page is loaded, adds the submit function and also adds data to page
  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    fetch( '/submit', {
        method:'POST',
        body:'GET'
      }).then( function( response ) {
        // do something with the reponse 
        console.log( response )
        return response.text()
      }).then( function (txt) {
        const parsedJson = JSON.parse(txt),
        tbody = document.querySelector('tbody')
        let i = tbody.childElementCount==0 ? 0 : parsedJson.length-1
        for(i; i<parsedJson.length; i++) {
            addTableData(parsedJson[i])
        }
    })
  }