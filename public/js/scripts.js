let tableCols = 0
  let action = "add" //add, delete, edit. Default = "add"

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    action = "add"

    const input = document.querySelector( '#itemname' )
    const input2 = document.querySelector( '#itemprice' )
    const input3 = document.querySelector( '#itemquantity' )
    const json = { itemaction: action, itemname: input.value,  itemprice: input2.value, itemquantity: input3.value, itemtotal: ""}
    const body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    //MODIFY THIS
    .then( function( response ) {
      // do something with the reponse
      return response.json()
    })
    .then( function(txt){
      console.log(txt)
      if(tableCols < txt.length){
        let x = txt[tableCols]
        updateTable(x.itemname, x.itemprice, x.itemquantity, x.itemtotal)
        tableCols = txt.length
      }
    })

    return false
  }
  
  const delBut = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    action = "delete"

    const input = document.querySelector( '#itemname' )
    const input2 = document.querySelector( '#itemprice' )
    const input3 = document.querySelector( '#itemquantity' )
    const json = { itemaction: action, itemname: input.value,  itemprice: input2.value, itemquantity: input3.value, itemtotal: ""}
    const body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    //MODIFY THIS
    .then( function( response ) {
      // do something with the reponse
      return response.json()
    })
    .then( function(txt){
      console.log(txt)
      if(tableCols > txt.length){
        deleteLastRow()
        tableCols = txt.length
      }
    })

    return false
  }
  
  const editBut = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    action = "edit"

    const input = document.querySelector( '#itemname' )
    const input2 = document.querySelector( '#itemprice' )
    const input3 = document.querySelector( '#itemquantity' )
    const json = { itemaction: action, itemname: input.value,  itemprice: input2.value, itemquantity: input3.value, itemtotal: ""}
    const body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    //MODIFY THIS
    .then( function( response ) {
      // do something with the reponse
      return response.json()
    })
    .then( function(txt){
      console.log(txt)
      editTable(txt)
    })

    return false
  }
  
  let numRows = 1
  
  function updateTable(p1, p2, p3, p4) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = p1;
    cell2.innerHTML = p2;
    cell3.innerHTML = p3;
    cell4.innerHTML = p4;
    numRows++
  }
    
  function editTable(arr){
    for(var r = 0; r < arr.length; r++){
      var table = document.getElementById("myTable")
      table.rows[r+1].cells[0].innerHTML = arr[r].itemname
      table.rows[r+1].cells[1].innerHTML = arr[r].itemprice
      table.rows[r+1].cells[2].innerHTML = arr[r].itemquantity
      table.rows[r+1].cells[3].innerHTML = arr[r].itemtotal
    }
    return false
  }
  
  function deleteLastRow() {
    console.log("Removing last row...")
    if(numRows !== 1){
      document.getElementById("myTable").deleteRow(-1);
      numRows--
    }
    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#addbutton' )
    button.onclick = submit
    const dbutton = document.querySelector( '#deletebutton' )
    dbutton.onclick = delBut
    const edbutton = document.querySelector( '#editbutton' )
    edbutton.onclick = editBut
  }