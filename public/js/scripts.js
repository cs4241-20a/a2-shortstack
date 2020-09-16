// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
// prevent default form action from being carried out
	e.preventDefault()
	
	/*
	const description = document.querySelector( '#description' ),
	weight = document.querySelector( '#weight' ),
	deliv_date = document.querySelector( '#deliv_date' ),
	*/
	
	const newpackage = {
		description: document.querySelector( '#description' ).value,
		weight: Math.abs(document.querySelector( '#weight' ).value),
		deliv_date: Math.abs(document.querySelector( '#deliv_date' ).value),
		price: Math.abs(document.querySelector( '#weight' ).value) + 20*(1/(1 + Math.abs(document.querySelector( '#deliv_date' ).value)))
	} 
	
	/*
	json = { yourname: input.value },
	body = JSON.stringify( json )
	*/
	const body = JSON.stringify( newpackage )
	console.log(body);
	var table = document.getElementById('package_table');
	var new_row = table.insertRow(1);
	var new_desc = new_row.insertCell(0);
	var new_weight = new_row.insertCell(1);
	var new_days = new_row.insertCell(2);
	var new_cost = new_row.insertCell(3);
	
	new_desc.innerHTML = newpackage.description;
	new_weight.innerHTML = newpackage.weight;
	new_days.innerHTML = newpackage.deliv_date;
	new_cost.innerHTML = "$" + newpackage.price.toFixed(2);
	
	
	fetch( '/submit', {
		method:'POST',
		body 
	})
	.then( function( response ) {
		// do something with the reponse 
		console.log( response )
	})

	return false
	
}

window.onload = function() {
	const button = document.querySelector( 'button' )
	button.onclick = submit
}

console.log("Welcome to assignment 2!")