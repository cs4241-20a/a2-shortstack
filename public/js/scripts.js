// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")


/*
let playerList = []
let listOrder = {
  "nickname": 0,
  "Username": 1,
  "Password": 2,
  "Foot": 3,
  "Positon": 4,
  "dateJoined": 5,
}

function deleteItem(id) {

  let entry = document.getElementById(id)

  fetch( 'delete', {
    method:'POST',
    body: JSON.stringify({id: id})
  }).then( function( response) {
    if(response.status === 200) {
      alert("Successfully removed");
      entry.remove();
    }
    else {
      alert("Entry was not removed successfully, try again!")
    }
  })
}

function createUser() {
  let table = docuent.getElementById('players')
  fetch('/playerLink',{
    method:'POST'
  }).then( function(response) {
    return response.text();
}).then(function(text){
  JSON.parse(text).forEach(item =>{
    let row = table.insertRow(-1);
    let id = item.id;

    row.id = id;

    for(let key in listOrder) {
      let cell = row.insertCell(listOrder[key]);
      if( item[key] === -1) {
        cell.innerHTML = 'HIDDEN'
        cell.classList.add('hidden');
      }
      else {
        cell.innerHTML = item[key];
      }
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete User"
    deleteButton.onClick = (() => deleteItem(id));
    let buttonCell = row.insertCell(6);
    buttonCell.appendChild(deleteButton);
  });
})
}

createUser();
*/
