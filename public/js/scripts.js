// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

var todos = []

const updateData = function(e){
  console.log('Getting')
 
  fetch( '/appData', {
    method: 'GET'
  })
  .then( function( response ) {

    return (response.json())
    
  }).then(function(data) {
    
    todos = data;
    console.log(todos);
    document.querySelector('#taskList').innerHTML = '';
    todos.forEach(
      element => document.querySelector('#taskList').innerHTML += 
      '<li><task>' + element.task + '</task><priority>' + element.priority + 
      '</priority><date>' + element.date + '</date><due>' + element.due + '</due>' +
      '<button onclick=\'deleteTask(event)\' class=\'deleteButton\'>Delete</button</li>'
    );
  })
  
  return false
}

const submitTask = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const taskInput = document.querySelector( '#task' )
  const priorityInput = document.querySelector('#priority')

  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + parseInt(priorityInput.value))
  var due = dueDate.getFullYear()+'-'+(dueDate.getMonth()+1)+'-'+dueDate.getDate(),
        
  json = { task: taskInput.value , priority: priorityInput.value, date: date, due: due},
  body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body
  })
  .then( function( response ) {

    return (response.json())
    
  }).then(function(data) {
    
    todos = data;
    console.log(todos);
    document.querySelector('#taskList').innerHTML = '';
    todos.forEach(
      element => document.querySelector('#taskList').innerHTML += 
      '<li><task>' + element.task + '</task><priority>' + element.priority + 
      '</priority><date>' + element.date + '</date><due>' + element.due + '</due>' +
      '<button onclick=\'deleteTask(event)\' class=\'deleteButton\'>Delete</button</li>'
    );
  })

  return false
}

function deleteTask(event) {
  
  var item = event.target.parentElement
  
  var eTask = item.getElementsByTagName("task")[0].innerHTML
  var ePriority = item.getElementsByTagName("priority")[0].innerHTML
  var eDate = item.getElementsByTagName("date")[0].innerHTML
  var eDue = item.getElementsByTagName("due")[0].innerHTML
  
  var json = { task: eTask , priority: ePriority, date: eDate , due: eDue}
  var body = JSON.stringify(json)
  
  console.log(body)
  
  fetch( '/delete', {
    method:'POST',
    body
  })
  .then( function( response ) {

    return (response.json())
    
  }).then(function(data) {
    
    todos = data;
    console.log(todos);
    document.querySelector('#taskList').innerHTML = '';
    todos.forEach(
      element => document.querySelector('#taskList').innerHTML += 
      '<li><task>' + element.task + '</task><priority>' + element.priority + 
      '</priority><date>' + element.date + '</date><due>' + element.due + '</due>' +
      '<button onclick=\'deleteTask(event)\' class=\'deleteButton\'>Delete</button</li>'
    );
  })
}

/*const deleteTask = function (e) {
  console.log('Delete Task')
  
  var task = e.target.parentElement
  
  var json = { task: task.getElementsByTagName("task") , priority: task.getElementsByTagName("priority"), 
              date: task.getElementsByTagName("date"), due: task.getElementsByTagName("due")}
  var body = JSON.stringify(task)
  
  fetch( '/delete', {
    method:'POST',
    body
  })
  .then( function( response ) {

    return (response.json())
    
  }).then(function(data) {
    
    todos = data;
    console.log(todos);
    document.querySelector('#taskList').innerHTML = '';
    todos.forEach(
      element => document.querySelector('#taskList').innerHTML += 
      '<li><task>' + element.task + '</task><priority>' + element.priority + 
      '</priority><date>' + element.date + '</date><due>' + element.due + '</due>' +
      '<button onclick=\'deleteTask(event)\' class=\'deleteButton\'>Delete</button</li>'
    );
  })
  
}*/

window.onload = function() {
  updateData()
  const button = document.querySelector( '#submitButton' )
  button.onclick = submitTask
}