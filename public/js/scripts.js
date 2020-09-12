// Add some Javascript code here, to run on the front end.
var data = [];

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  
  const task = document.querySelector( '#task' ),
        prio = document.querySelector( '#priority' ),
        startTime = document.querySelector( '#starttime' ),
        json = { task: task.value, prio: prio.value, startTime: startTime.value},
        body = JSON.stringify( json )
  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // Translate it into text
    return response.text();
  })
  .then( function( taskitem ){
    //var TI= JSON.parse(taskitem);
    if(data.length < 5){
      data.push(JSON.parse(taskitem));
    }
    updateList();
    console.log(data);
  })
  return false
}

    
   function updateList(){
      var numTask = data.length;
      var i;
      for(i = 0; i < numTask; i++){
        updateListItem(i , data[i])
      }
    }
    function updateListItem(index, taskitem){
      var listID = "";
      var taskID = "";
      var timeID = "";
      switch(index){
        case 0: taskID = "t1"; timeID = "ti1"; listID = "l1"; break;
        case 1: taskID = "t2"; timeID = "ti2"; listID = "l2";break;
        case 2: taskID = "t3"; timeID = "ti3"; listID = "l3";break;
        case 3: taskID = "t4"; timeID = "ti4"; listID = "l4";break;
        case 4: taskID = "t5"; timeID = "ti5"; listID = "l5";break;
        default: taskID = "t1"; timeID = "ti1"; listID = "l1"; break;
      }
      
      var listItem = document.getElementById(listID);
      var taskText = document.getElementById(taskID);
      var timeText = document.getElementById(timeID);
      
      if(listItem.style.display === 'none'){
        listItem.style.display = 'block';
      }
      taskText.innerHTML = taskitem.task;
      timeText.innerHTML = "Start Time " +  taskitem.startTime + " " + "Due Time " + taskitem.endTime;
    }

window.onload = function() {
  const button = document.getElementById("addtask");
  button.onclick = submit
  // Clear input area on first click
  const input = document.getElementById("task");
  input.onclick = function(){
    if(input.value === "Enter task detail here")
      input.value = "";
  }
  // Make list item invisible at start
  var tasklist = document.querySelectorAll(".tasklistitem");
  var i;
  for(i = 0; i < tasklist.length ; i++){
    tasklist[i].style.display = 'none';
  }
  // Setting up 'x' button
  var closelist = document.querySelectorAll(".close");
  for(i = 0; i < tasklist.length ; i++){
    closelist[i].addEventListener( "click", function(){
      var index;
      if(this.id === "c1"){
        index = 0;
      }else if (this.id === "c2"){
        index = 1;
      }else if (this.id === "c3"){
        index = 2;
      }else if (this.id === "c4"){
        index = 3;
      }else if (this.id === "c5"){
        index = 4;
      }
      switch(data.length){
        case 1: document.getElementById("l1").style.display = "none"; break;
        case 2: document.getElementById("l2").style.display = "none";break;
        case 3: document.getElementById("l3").style.display = "none";break;
        case 4: document.getElementById("l4").style.display = "none";break;
        case 5: document.getElementById("l5").style.display = "none";break;
        default: break;
      }
      data.splice(index,1);
      
      updateList();
      });
  }
}