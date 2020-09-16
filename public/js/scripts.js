// Add some Javascript code here, to run on the front end.


const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input1 = document.querySelector("#orderItem"),
    input2 = document.querySelector("#orderDetails"),
    input3 = document.querySelector("#orderCost"),
    json = {
      orderItem: input1.value,
      orderDetails: input2.value,
      orderCost: input3.value
    },
    body = JSON.stringify(json);

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    return response.json();
    })
    .then(function(json) {
      let orders = [];
      var i;
      orders = JSON.stringify(json);
      console.log(orders);

       //get number of rows in old table of current tasks
       var numRows = document.getElementById("currentTasks").rows.length;
       var table = document.getElementById("currentTasks");
 
       //delete all of the old rows except for the title row
       for (i = 1; i < numRows; i++) {
         table.deleteRow(1);
         console.log("deleted");
       }
 
       // re-populate the table of current tasks with tasks from the server
       for (i = 0; i < json.length; i++) {
         // insert a new row
         var row = table.insertRow(i + 1);
 
         // Insert new cells
         var cell1 = row.insertCell(0);
         var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
         var cell4 = row.insertCell(3);
         var cell5 = row.insertCell(4);
 
         // Add some data to the new cells:
         cell1.innerHTML = JSON.stringify(json[i].orderNumber);
         cell2.innerHTML = JSON.stringify(json[i].orderItem);
         cell3.innerHTML = JSON.stringify(json[i].orderDetails);
         cell4.innerHTML = JSON.stringify(json[i].orderCost);
         cell5.innerHTML = JSON.stringify(json[i].orderTotalCost);
       }
       console.log(JSON.stringify(json));
    });
  return false;
};

const alter = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const input1 = document.querySelector("#newOrderNumber"),
      input2 = document.querySelector("#newOrderItem"),
      input3 = document.querySelector("#newOrderDetails"),
      json = {
        orderNumber: input1.value,
        orderItem: input2.value,
        orderDetails: input3.value
      },
      body = JSON.stringify(json);
  
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.json();
      })
      .then(function(json) {
        let orders = [];
        var i;
        orders = JSON.stringify(json);
        console.log(orders);
  
         //get number of rows in old table of current tasks
         var numRows = document.getElementById("currentTasks").rows.length;
         var table = document.getElementById("currentTasks");
   
         //delete all of the old rows except for the title row
         for (i = 1; i < numRows; i++) {
           table.deleteRow(1);
           console.log("deleted");
         }
   
         // re-populate the table of current tasks with tasks from the server
         for (i = 0; i < json.length; i++) {
           // insert a new row
           var row = table.insertRow(i + 1);
   
           // Insert new cells
           var cell1 = row.insertCell(0);
           var cell2 = row.insertCell(1);
           var cell3 = row.insertCell(2);
           var cell4 = row.insertCell(3);
           var cell5 = row.insertCell(4);
   
           // Add some data to the new cells:
           cell1.innerHTML = JSON.stringify(json[i].orderNumber);
           cell2.innerHTML = JSON.stringify(json[i].orderItem);
           cell3.innerHTML = JSON.stringify(json[i].orderDetails);
           cell4.innerHTML = JSON.stringify(json[i].orderCost);
           cell5.innerHTML = JSON.stringify(json[i].orderTotalCost);
         }
         console.log(JSON.stringify(json));
      });
    return false;
  };


  const deleteItem = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const input = document.querySelector("#deleteOrderNumber"),
      json = {
        orderNumber: input.value,
      },
      body = JSON.stringify(json);
  
    fetch( '/submit', {
      method:'DELETE',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.json();
      })
      .then(function(json) {
        let orders = [];
        var i;
        orders = JSON.stringify(json);
        console.log(orders);
  
         //get number of rows in old table of current tasks
         var numRows = document.getElementById("currentTasks").rows.length;
         var table = document.getElementById("currentTasks");
   
         //delete all of the old rows except for the title row
         for (i = 1; i < numRows; i++) {
           table.deleteRow(1);
           console.log("deleted");
         }
   
         // re-populate the table of current tasks with tasks from the server
         for (i = 0; i < json.length; i++) {
           // insert a new row
           var row = table.insertRow(i + 1);
   
           // Insert new cells
           var cell1 = row.insertCell(0);
           var cell2 = row.insertCell(1);
           var cell3 = row.insertCell(2);
           var cell4 = row.insertCell(3);
           var cell5 = row.insertCell(4);
   
           // Add some data to the new cells:
           cell1.innerHTML = JSON.stringify(json[i].orderNumber);
           cell2.innerHTML = JSON.stringify(json[i].orderItem);
           cell3.innerHTML = JSON.stringify(json[i].orderDetails);
           cell4.innerHTML = JSON.stringify(json[i].orderCost);
           cell5.innerHTML = JSON.stringify(json[i].orderTotalCost);
         }
         console.log(JSON.stringify(json));
      });
    return false;
  };

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit

  const changeButton = document.querySelector(".changeBtn");
  changeButton.onclick = alter

  const deleteButton = document.querySelector(".deleteBtn");
  deleteButton.onclick = deleteItem
}

