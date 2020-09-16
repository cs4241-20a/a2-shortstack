console.log("Welcome to assignment 2!");

function resetServerData(){
  let table = document.getElementById("groceryList");
  let numRows = table.rows.length-2;
  // first delete all existing rows on the user page
  for(let i=0; i<numRows; i++){
    deleteRow(2);
  }
}

function refreshTable(tabledata){
  let table = document.getElementById("groceryList");
  let numRows = table.rows.length-2;
  // first delete all existing rows on the user page
  for(let i=0; i<numRows; i++){
    table.deleteRow(2);
  }
  // then add all rows from the server data
  for(let j=0; j<tabledata.length; j++){
    const foodname = String(tabledata[j].foodname);
    const foodcategory = tabledata[j].foodcategory;
    const price = tabledata[j].price;
    const quantity = tabledata[j].quantity;

    // Create an empty <tr> element and add it to the last position of the table:
    let row = table.insertRow(-1);

    // Insert new cells (<td> elements) at the 1st, 2nd, and 3rd position of the "new" <tr> element:
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell6.className = "buttonColumn";

    let btn = document.createElement('input');
    btn.type = "button";
    btn.value = "Delete Row";
    btn.className = "deleteButton";
    btn.onclick = function(){
      deleteRow(row);
    };
    cell6.appendChild(btn);

    // Add some text to the new cells:
    cell1.innerHTML = foodname;
    cell2.innerHTML = foodcategory;
    cell3.innerHTML = price;
    cell4.innerHTML = quantity;
    cell5.innerHTML = deriveAisle(foodcategory);
  }
  
  updateTotalCount();
  updateTotalPrice();
}

function deleteRow (row){
  var table = document.getElementById("groceryList");
  var index = row.rowIndex;
  
  const json = { rowid: index },
    body = JSON.stringify( json )

  fetch( '/delete', {
    method:'DELETE',
    body 
  })
  .then( function( response ) {
    console.log( response );
    getData();
  })

  return false;
}

function updateTotalCount(){
  var table = document.getElementById("groceryList");
  let sum = 0;
  for (var i = 2, row; row = table.rows[i]; i++) {
    sum = Number(sum) + Number(row.cells[3].innerHTML);
  }
  
  document.getElementById('countvalue').innerHTML = sum;
}

function updateTotalPrice(){
  var table = document.getElementById("groceryList");
  let sum = 0;
  for (var i = 2, row; row = table.rows[i]; i++) {
    const cell = row.cells[2];
    const cellStr = String(cell.innerHTML);
    let value = cellStr;
    if(cellStr.slice(0, 1) == "$"){
      value = cellStr.slice(1, cellStr.length);
    }
    let count = row.cells[3].innerHTML;
    sum = Number(sum) + (Number(count) * Number(value));
    cell.innerHTML = "$" + value;
  }
  
  sum = Math.round(sum * 100) / 100;
  
  document.getElementById('pricevalue').innerHTML = "$" + sum;
}

function deriveAisle(foodcategory){
  let aisle = 0;
  switch(foodcategory){
    case("Produce"):
      aisle = 1;
      break;
    case("Condiment"):
      aisle = 2;
      break;
    case("Baking"):
      aisle = 3;
      break;
    case("Canned Good"):
      aisle = 4;
      break;
    case("Pasta/Dinner"):
      aisle = 5;
      break;
    case("Snack/Candy"):
      aisle = 6;
      break;
    case("Beverage"):
      aisle = 7;
      break;
    case("Deli/Meat"):
      aisle = 8;
      break;
    case("Paper Good"):
      aisle = 9;
      break;
    case("Hygiene"):
      aisle = 10;
      break;
    case("Frozen"):
      aisle = 11;
      break;
    case("Dairy"):
      aisle = 12;
      break;
    case("Other"):
      aisle = 0;
      break;
  }
  return aisle;
}

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  
  const foodname = document.querySelector( '#foodname' );
  const foodcategory = document.querySelector( '#foodcategory' );
  let price = document.querySelector( '#price' );
  const quantity = document.querySelector( '#quantity' );
  
  if(foodname.value == "" || foodcategory.value == "foodcategory" ||
  price.value == '' || quantity.value == ''){
    alert("must input all fields");
    console.log("must input all fields");
    return;
  }
  
  if(price.value < 0 || quantity.value < 0){
    alert("cannot have a negative price or value");
    console.log("cannot have a negative price or value");
    return;
  }
  
  if(quantity.value % 1 !== 0){
    alert("quantity must be a whole number");
    console.log("quantity must be a whole number");
    return;
  }
  
  price.value = Math.round(price.value * 100) / 100;

  const json = { foodname: foodname.value,
           foodcategory: foodcategory.value,
           price: price.value,
           quantity: quantity.value,
           aisle: deriveAisle() },
  body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    console.log( response )
    getData();
  })
  
  return false;
}

function getData (){
  fetch( '/results', {
    method:'GET'
  })
  .then( function( response ) {
    // do something with the reponse 
    return response.json();
  })
  .then( function( data ) {
    refreshTable(data);
  })
  
  return false;
}

window.onload = function() {
  getData();
  const button = document.querySelector( '#addButton' );
  button.onclick = submit;
}