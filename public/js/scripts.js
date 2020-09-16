// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")
const submit = function( e ) {
    // prevent default form action from being carried out
    console.log("Submit is called")
    e.preventDefault()

    const name = document.querySelector( '#name' )
    const major = document.querySelector('#major')
    const year = document.querySelector('#collegeyear')
    const number = document.querySelector('#number')


    var json = { 
      name: name.value, 
      major: major.value,
      collegeyear: year.value,
      number: number.value,
    }

    var body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      console.log(body)
      displayTable()
    })
    return false
  }

  //display the hardcoded exmple data into the page
  const displayTable = function (){
    // clear table before loading new data
    $('#password_table').find('tbody').empty()

    //fetch data residing in the memory
    fetch('/submit', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(function(response){
      console.log("received data!")
      console.log(response)
      var server_data = ''
      $.each(response,function(key,value){
        server_data += '<tr>'
        server_data += '<td>' + value.name + '</td>'
        server_data += '<td>' + value.major + '</td>'
        server_data += '<td>' + value.collegeyear + '</td>'
        server_data += '<td>' + value.number + '</td>'
        server_data += '<td>' + value.password + '</td>'
        server_data += '<td><button type="button" class="btn btn-danger" id="deleteButton" onclick="deleteData(' + key + ')">Delete</button></td>'
        server_data += '<td><button type="button" class="btn btn-primary" onclick="openForm(' + key + ')">Modify</button></td>'
      })
      $('#password_table').append(server_data)
    })
  }

  const deleteData = function(key){
    fetch('/submit?idx='+key, {
      method: 'DELETE'
    })
    .then(function(response){
      console.log("delete is called on idx: "+ key)
      displayTable()
    })
  }

  const modifyData = function(key){
    const name = document.querySelector( '#mName' )
    const major = document.querySelector('#mMajor')
    const year = document.querySelector('#mCollegeyear')
    const number = document.querySelector('#mNumber')

    var json = { 
      name: name.value, 
      major: major.value,
      collegeyear: year.value,
      number: number.value,
    }
    var body = JSON.stringify( json )

    fetch( '/modify?idx='+key, {
      method:'PUT',
      body 
    })
    .then( function( response ) {
      console.log("modify is called on idx: "+key)
      displayTable()
    })
    document.getElementById("modifyForm").style.display = "none";
    return false
  }

  function openForm(key) {
    console.log("open the form")
    document.getElementById("modifyForm").style.display = "block";
    const modify_button = document.querySelector( '#submitModification')
    modify_button.onclick = function(e){
      modifyData(key)
      e.preventDefault()
    }
  }

  function closeForm(e) {
    e.preventDefault()
    document.getElementById("modifyForm").style.display = "none";
  }

  window.onload = function() {
    const submit_button = document.querySelector( '#submitButton' )
    const close_popup = document.querySelector( '#closeModification' )
    close_popup.onclick = closeForm
    submit_button.onclick = submit
    displayTable()
  }
