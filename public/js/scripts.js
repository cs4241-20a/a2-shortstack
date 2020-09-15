// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
   
      function parseDate(dateStr){
          var date = dateStr.split('-');
          return new Date(date[2], date[0]-1, date[1]);
      }
      
      function calcPrio(fdate, sdate){
          var distance = Math.round((sdate-fdate)/(1000*60*60*24));
          if(distance>= 1 && distance <= 7){
              return 10;
          }
          else if(distance>=8 && distance <= 14){
              return 9;
          }
          else if(distance>=15 && distance<=21){
              return 8;
          }
          else if(distance>=22 && distance<=30){
              return 7;
          }
          else if(distance>=31 && distance<=45){
              return 6;
          }
          else if(distance>=46 && distance<=60){
              return 5;
          }
          else if(distance>=61 && distance <= 90){
              return 4;
          }
          else if(distance>=91 && distance<= 120){
              return 3;
          }
          else if(distance >= 121 && distance <=210){
              return 2;
          }
          else if(distance>= 211){
              return 1;
          }
          else{
              return "Error";
          }
      }
      function checkDateForm(str){
          if(str.match('^[-0-9]')){
              return true;
          }else{
              return false;
          }
      }
      
    function fillTable(){
    document.getElementById("status").innerHTML = "";
    if(!(checkDateForm(document.getElementById("pSDate").value)) || !(checkDateForm(document.getElementById("pEDate").value))){
            document.getElementById("status").innerHTML = "Invalid Date";
            return false;
        }
      
    var tableRef = document.getElementById("projectTable")
    var newRow = tableRef.insertRow();
    var prio;
    for(var i=0; i<5; i++){ 
      var newCell = newRow.insertCell(i);
    if(i == 0){
      var newText = document.createTextNode(document.getElementById("pName").value);
      }
    else if(i == 1){
        var newText = document.createTextNode(document.getElementById("pDesc").value)
    }
    else if(i==2){
        var newText = document.createTextNode(document.getElementById("pSDate").value)
    }
    else if(i==3){
        var newText = document.createTextNode(document.getElementById("pEDate").value)
    }
      else{
          var startDate = parseDate(document.getElementById("pSDate").value);
    var endDate = parseDate(document.getElementById("pEDate").value);
          prio = calcPrio(startDate,endDate);
          var newText = document.createTextNode(prio.toString());
      }
      newCell.appendChild(newText);
    }
        return true;
    }
      
    function clearInput(){
        document.getElementById("pName").value ="";
        document.getElementById("pDesc").value ="";
        document.getElementById("pSDate").value ="";
        document.getElementById("pEDate").value ="";
    }
      
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
      if(!fillTable()){
          return;
      }
      
    const projectName = document.querySelector( '#pName' ),
          projectDesc = document.querySelector('#pDesc'),
          projectSDate = document.querySelector('#pSDate'),
          projectEDate = document.querySelector('#pEDAte'),
          json = { pName: projectName.value,
                   pDesc: projectDesc.value,
                   pSDate: projectSDate.value,
                   pEDate: projectEDate.value,
                   pPrio: prio.toString(),
                 },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

      clearInput();
    
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
