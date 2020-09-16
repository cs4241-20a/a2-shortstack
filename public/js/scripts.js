//get request to delete last task and refreshes current displayed tasks
const deleteData= function(e){
  fetch('/delete',{
    method:'POST'
  })
  .then( function( response ) {
    console.log("deleted successfully")
    document.getElementById("tasks").innerHTML="";
    showData()
  })
  return false;
}
//get request to show the current data in json file 
const showData = function( e ){
    fetch('/showData',{
      method:'GET'
    })
    .then( response=> response.json())
    .then(json=>{
      for(var jsonItem in json.tasks){
      jsonItem = Number(jsonItem)
      jsonUpdated=json.tasks[jsonItem]
      var list = document.createElement("li")
      var h6 = document.createElement("b");
      var li = document.createElement("p");
      let dateTitle =document.createTextNode("Date created:")
      let date= document.createTextNode(jsonUpdated.date)
      let taskTitle =document.createTextNode("Task: ")
      let task = document.createTextNode(jsonUpdated.task)
      let priorityTitle= document.createTextNode("Priority: ")
      let priority= document.createTextNode(jsonUpdated.priority)
      let expectedTitle= document.createTextNode("Hours: ")
      let expected=document.createTextNode(jsonUpdated.expected+" hours")
      h6.appendChild(dateTitle);
      li.appendChild(date);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(taskTitle);
      li.appendChild(task);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(priorityTitle);
      li.appendChild(priority);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(expectedTitle);
      li.appendChild(expected);
      list.appendChild(h6);
      list.appendChild(li);
      document.getElementById("tasks").appendChild(list);
    }})

    return false
  }
  //post request to submit new task
  const submit = function( e ) {
    e.preventDefault()

    const taskName = document.querySelector( '#taskName' ),
          expectedHours = document.querySelector('#expected'),
          json = { task: taskName.value, expected: expectedHours.value},
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: body 
    })
   .then( response=> response.json())
   .then(json=>{
      jsonUpdated=json
      var list = document.createElement("li")
      var h6 = document.createElement("b");
      var li = document.createElement("p");
      let dateTitle =document.createTextNode("Date created:")
      let date= document.createTextNode(jsonUpdated.date)
      let taskTitle =document.createTextNode("Task: ")
      let task = document.createTextNode(jsonUpdated.task)
      let priorityTitle= document.createTextNode("Priority: ")
      let priority= document.createTextNode(jsonUpdated.priority)
      let expectedTitle= document.createTextNode("Hours: ")
      let expected=document.createTextNode(jsonUpdated.expected+" hours")
      h6.appendChild(dateTitle);
      li.appendChild(date);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(taskTitle);
      li.appendChild(task);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(priorityTitle);
      li.appendChild(priority);
      list.appendChild(h6);
      list.appendChild(li);
      h6 = document.createElement("b");
      li = document.createElement("p");
      h6.appendChild(expectedTitle);
      li.appendChild(expected);
      list.appendChild(h6);
      list.appendChild(li);
      document.getElementById("tasks").appendChild(list);

   })
    return false
  };

  //when everything on your page has loaded 
  window.onload = function() {
    const tasks = document.getElementById( 'tasks' )
    tasks.onload = showData();
    const button = document.querySelector( 'button' )
    button.onclick = submit
    const deleteButton= document.getElementById('delete')
    deleteButton.onclick = deleteData
  }
