function build (response){
  var keys = [];
  
  var table = document.getElementById("myTable"); 
  for (var i = 0; i < response.length; i++) {
  table.deleteRow(-1);
  }
for (var i = 0; i < response.length; i++) {
  var tr = table.insertRow(-1);
	for (keys in response[i]) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = response[i][keys]
    }
  }
}

const submit = function( e ) {
    // prevent default form action from being carried out
e.preventDefault()
var food_name = document.querySelector( '#foodname' )
var datebought = document.querySelector("#purchased")
var enjoy =document.querySelector("#enjoyability")
var size = document.querySelector("#size")
  
if(food_name.value === ""){
  alert("Did not fill out food name field.")
}
else if(datebought.value === ""){
  alert("Did not fill out purchased field.")
}
else if(enjoy.value === ""){
  alert("Did not fill out enjoy field.")
}
  
else{ 
  const
  json = { foodname: food_name.value ,
          purchased: datebought.value,
          enjoyability: enjoy.value,
          size:size.value},          
          body = JSON.stringify(json)


  fetch( '/submit', {
  method:'POST',
  body
  })
.then(response => response.json())
.then(json => build(json))
return false;
 }
}

window.onload = function() {
const button = document.querySelector( '#btn' )
button.onclick = submit
}