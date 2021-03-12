//populates the table as soon as the page loads
window.addEventListener('load', function() {
  //fill in table with items from server
  populateTable()

  //event listener for the "add item" button
  document.getElementById("addButton").addEventListener('click', function() {
  addItem()
  })
})

//adds inputted item to the server database and fills in the table
const addItem = function() {
  //define variables for the input fields
  var itemnameField = document.getElementById("itemname");
  var unitpriceField = document.getElementById("unitprice");
  var quantityField = document.getElementById("quantity");
  
  //get data from input fields
  var itemname = itemnameField.value;
  var unitprice = floatify(unitpriceField.value);
  var quantity = floatify(quantityField.value);

  //send the input data to the server
  var itemJSON = {itemname: itemname, unitprice: unitprice, quantity: quantity};
  var body = JSON.stringify(itemJSON);
  fetch("/addItem", {
    method: "POST",
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  //clear fields
  itemnameField.value = "";
  unitpriceField.value = "";
  quantityField.value = "";

  //fill in the list table again now that there is a new item
  populateTable();
}

//parses string into a float (or returns 0 if it is not a number)
const floatify = function(inputString) {
  var numVal = parseFloat(inputString);
  if (inputString.length == 0 || numVal == NaN) {
    numVal = 0;
  }
  return numVal;
}

//function to make the table with list items
const populateTable = function() {
  //get all the list items from the server
  fetch("/fetchItems", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(json => {
  //put data into a 2d array suitable for printing into the table
    var listItems = json;
    var tableData = [];
    var totalSubtotal = 0;
    var totalTax = 0;

    for (var i = 0; i < listItems.length; i++) {
      var currentItem = listItems[i];
      tableData.push([currentItem.itemname, currentItem.unitprice, currentItem.quantity, 
                      currentItem.subtotal, currentItem.tax, currentItem.id]);
      totalSubtotal += currentItem.subtotal;
      totalTax += currentItem.tax;
    }

  //print the data onto the webpage
  printTable(tableData);
  printTotals(totalSubtotal, totalTax);
  })
}

//helper function to print the table onto the webpage
const printTable = function(tableData) {
  const listTable = document.querySelector("#listtable"); 
  
  //clear table in case it has already been built
  listTable.innerHTML = "";
  
  //build header row
  var headerRow = listTable.insertRow(0);
  addHCell(headerRow, "Item Name");
  addHCell(headerRow, "Unit Price");
  addHCell(headerRow, "Quantity");
  addHCell(headerRow, "Subtotal");
  addHCell(headerRow, "Tax");
  addHCell(headerRow, "");
  addHCell(headerRow, "");

  //fill in item rows
  for (var i = 0; i < tableData.length; i++) {
    var currentItem = tableData[i];
    var currentRow = listTable.insertRow();
    currentRow.id = currentItem[5];
    var currentRowIndex = currentRow.rowIndex;
    addCell(currentRow, currentItem[0]);
    addCell(currentRow, dollarFormat(currentItem[1]));
    addCell(currentRow, currentItem[2]);
    addCell(currentRow, dollarFormat(currentItem[3]));
    addCell(currentRow, dollarFormat(currentItem[4]));
    addCell(currentRow, editButton(currentItem[0], currentItem[1], currentItem[2], currentItem[5]));
    addCell(currentRow, deleteButton(currentItem[0], currentItem[5])); //[0] is name, [5] is id
  }
}

//adds a table cell to a row with specified contents
const addCell = function(row, contents) {
  row.insertCell().innerHTML = contents;
}

//adds a table cell with the tHeader class to a row with specified contents
const addHCell = function(row, contents) {
  var hcell = row.insertCell();
  hcell.classList.add("tHeader");
  hcell.innerHTML = contents;
}

//formats dollar values with $ sign and 2 decimal places
const dollarFormat = function(cost) {
  return "$" + cost.toFixed(2);
}

//creates the "edit" button for a table row
const editButton = function(name, unitprice, quantity, id) {
  var argString = name + "\', \'" + unitprice + "\', \'" + quantity + "\', \'" + id + "\'";
  var clickString = "onclick=\"edit(\'" + argString + ")\"";
  return "<input type=\'button\' value=\'Edit\'" + clickString + " />";
}

//runs when edit button is clicked
const edit = function(name, unitprice, quantity, id) {
  //hide "add item" button
  document.getElementById("addButton").classList.add("hidden");
  
  //reveal "save" button and attach onclick function
  var saveButton = document.getElementById("saveButton");
  saveButton.classList.remove("hidden");
  saveButton.onclick = function() { save(name, id)};

  //fill in form fields with data from item being edited
  document.getElementById("itemname").value = name;
  document.getElementById("unitprice").value = floatify(unitprice).toFixed(2);
  document.getElementById("quantity").value = quantity;
}

//
const save = function(previousName, id) {
  //define variables for the input fields
  var itemnameField = document.getElementById("itemname");
  var unitpriceField = document.getElementById("unitprice");
  var quantityField = document.getElementById("quantity");
  
  //get edited data from input fields
  var newName = itemnameField.value;
  var newUnitprice = floatify(unitpriceField.value);
  var newQuantity = floatify(quantityField.value);

  //send POST request to server with item to update
  var itemJSON = {previousName: previousName, id: id, name: newName, unitprice: newUnitprice, quantity: newQuantity};
  var body = JSON.stringify(itemJSON);
  fetch("/updateItem", {
    method: "POST",
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  //clear fields
  itemnameField.value = "";
  unitpriceField.value = "";
  quantityField.value = "";
  
  //reveal "add item" button
  document.getElementById("addButton").classList.remove("hidden");
  
  //hide "save" button
  document.getElementById("saveButton").classList.add("hidden");
  
  //regenerate the list table
  populateTable();
}

//creates the "delete" button for a table row
const deleteButton = function(itemName, itemId) {
  var htmlPt1 = "<input type='button' value='Delete' onclick=\"deleteItem(";
  var htmlPt2 = "'" + itemName + "', '" + itemId + "')\"/>";
  return htmlPt1 + htmlPt2;
}

//runs when a deleteButton is clicked
const deleteItem = function(itemName, itemId) {
  //delete item in the server
  deleteFromServer(itemName, itemId);

  //re-make table
  populateTable();
}

//delete specified item from server
const deleteFromServer = function(itemName, itemId) {
  //send post request to server with name and id of item to delete
  var itemJSON = {itemname: itemName, id: itemId};
  var body = JSON.stringify(itemJSON);
  fetch("/deleteItem", {
    method: "POST",
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//print the subtotal, tax, and total price for the whole list
const printTotals = function(subtotal, tax) {
  //set variables for html elements
  var subCell = document.getElementById("totalSubtotal");
  var taxCell = document.getElementById("totalTax");
  var totCell = document.getElementById("totalTotal");
  
  var totalPrice = subtotal + tax;
  
  //print totals to table on webpage
  subCell.innerHTML = dollarFormat(subtotal);
  taxCell.innerHTML = dollarFormat(tax);
  totCell.innerHTML = dollarFormat(totalPrice);
}