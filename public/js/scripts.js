// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

  

  function addhmwk() {
    //console.log(body)
    
    let input = document.querySelector('#homework').value
    let subject = document.querySelector('#subject').value
    let date = document.querySelector('.dateButton').value

    let json = { "homework": input, "subject": subject, "date": date}
    let body = JSON.stringify(json)
    
    fetch( '/addhmwk', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      gethmwk()
      // do something with the reponse 
      console.log( response )
    })

    return false
  }

  function gethmwk() {
    fetch( '/hmwkResponse', {
      method:'GET'
    })
    .then( response => {
      response.json().then(function (array) {
        hmwkDisplay(array)
      });
    })
  }

  function hmwkDisplay(array) {
    let tbody = document.querySelector('#homeworkTable')
    tbody.innerHTML = ""
    console.log(tbody)
    for(let i = 0; i < array.length; i++) {
      let homeworkObj = array[i]
      let name = homeworkObj.homework
      let subject = homeworkObj.subject
      let date = homeworkObj.date
      
      console.log(name)
      
      
      let row = tbody.insertRow(-1)
      
      let cell1 = row.insertCell(0)
      let cell2 = row.insertCell(1)
      let cell3 = row.insertCell(2)
      let cell4 = row.insertCell(3)
      let cell5 = row.insertCell(4)
      cell5.className = "buttonColumn"
      
      let btn = document.createElement('input')
      btn.type = "button"
      btn.value = "Finished"
      btn.className = "finishButton"
      btn.onclick = function() {deleteHmwk(row)}
      cell5.appendChild(btn)
      
      let today = new Date();

      let dueDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      

      
      
      cell1.innerHTML = name
      cell2.innerHTML = subject
      cell3.innerHTML = date
      cell4.innerHTML = calPriority(date)
    }
  }

  function calPriority(date) {
    let priority = ""
    
    let today = new Date();
    let todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date1 = date.slice(8)
    let date2 = todayDate.slice(7)
    let num1 = parseInt(date1, 10)
    let num2 = parseInt(date2, 10)
    let answer = Math.abs(num1 - num2)
    
    if(answer <= 3)
      priority = "High"
    else if(answer <= 7)
      priority = "Medium"
    else
      priority = "Low"
    
    return priority
    
    
    
  }

  function deleteHmwk(row) {
    let tbody = document.querySelector('#homeworkTable')
    let index = row.rowIndex
    let json = {rowid: index}
    let body = JSON.stringify(json)
    
    fetch( '/finished', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      gethmwk()
    })
    
    return false
  }



  window.onload = function() {
    gethmwk()
  }