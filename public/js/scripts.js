// Add some Javascript code here, to run on the front end.
// This file contains the following methods for interacting with the server:
// submit() - submit a new listing
// deleteListing() - delete a specific listing by listing ID
// getListings() - load listings from the server to the website
// updateListing() - update a specific listing by listing ID

console.log("Welcome to assignment 2!")


const submit = function( e ) {
    // prevent default form action from being carried out
    // requires 3 parts
    // set action to blank 
    // preventDefault() called
    // function must return false

    e.preventDefault()

    // document represents current HTML document
    const firstName = document.querySelector( '#firstname' ),
          lastName = document.querySelector( '#lastname' ),
          cameraMake = document.querySelector( '#cameramake' ),
          cameraModel = document.querySelector( '#cameramodel' ),
          cameraFormat = document.querySelector( '#cameraformat' ),
          price = document.querySelector( '#price' ),
          condition = document.querySelector( '#condition' )
          json = { firstname: firstName.value, 
            lastname: lastName.value, 
            cameramake: cameraMake.value,
            cameramodel: cameraModel.value, 
            cameraformat: cameraFormat.value,
            price: price.value,
            condition: condition.value,
            delete: false,
            bargain: false,
            id: null},
          body = JSON.stringify( json ) // passed to fetch

    // Fetch is type of JS 'promise'
    // type of asynchronous function - prevents blocking main thread
    // important for JS as it usually is single-threaded
    fetch( '/submit', {
      method:'POST',
      body // this variable has the same name as the property, so the : is omitted - same as writing body: body
    })
    .then( function( response ) {     // fetch this document and *then* run this callback function on the server response
      // do something with the reponse 
      console.log( response )
    })
    .then( setTimeout(() => { getListings( e );}, 500 ) )

    return false
  }

  const deleteListing = function( e ) {
    e.preventDefault()

    const firstName = document.querySelector( '#deletefirstname' ),
          lastName = document.querySelector( '#deletelastname' ),
          id = document.querySelector( '#deletelistingnumber')

          json = {
            id: id.value,
            delete: true },
          body = JSON.stringify( json ) 

    fetch( '/data', {
      method:'POST',
      body 
    })
    .then( function( response ) {     
      console.log( response )
    })
    .then( setTimeout(() => { getListings( e );}, 500 ) )


    return false
  }

  const getListings = function( e ) {

    e.preventDefault()

    fetch( 'appdata', {
        method:'GET'
    })
    .then( response => response.json() )
    .then( function(body) {
        if( body.length === 0 ){
          return false
        }
        // let's create a dynamic table
        const numlistings = body.length + 1;

            var dataTable = document.createElement( "TABLE" );
            dataTable.border = "10";
     
            // Calculate number of columns for this table
            var columnCount = Object.keys( body[0] ).length;
     
            // row for header - iterate through first element's keys to pull types
            var row = dataTable.insertRow( -1 );
            for ( var key in body[0] ) {
              if( key === "delete" ){
                continue
              }
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = key;
                row.appendChild( headerCell );
            }
     
            // Iterate through appdata
            for (var i = 0; i < body.length; i++) {
                row = dataTable.insertRow( -1 );
                for ( var key in body[i] ) {
                  if( key === "delete" ){
                    continue
                  }
                    var cell = row.insertCell( -1 );
                    cell.innerHTML = body[i][key];
                }
            }
     
            var dvTable = document.getElementById( "dvTable" );
            dvTable.innerHTML = "";
            dvTable.appendChild( dataTable );
            console.log( "updated data displayed")
    } )


    return false
  }

  const updateListing = function( e ) {

    e.preventDefault()

    // document represents current HTML document
    const firstName = document.querySelector( '#updatefirstname' ),
          lastName = document.querySelector( '#updatelastname' ),
          cameraMake = document.querySelector( '#updatecameramake' ),
          cameraModel = document.querySelector( '#updatecameramodel' ),
          cameraFormat = document.querySelector( '#updatecameraformat' ),
          price = document.querySelector( '#updateprice' ),
          condition = document.querySelector( '#updatecondition' ),
          id = document.querySelector( '#listingnumber')
          json = { firstname: firstName.value, 
            lastname: lastName.value, 
            cameramake: cameraMake.value,
            cameramodel: cameraModel.value, 
            cameraformat: cameraFormat.value,
            price: price.value,
            condition: condition.value,
            delete: false,
            bargain: false,
            id: id.value},
          body = JSON.stringify( json ) // passed to fetch

    fetch( '/update', {
      method:'POST',
      body 
    })
    .then( function( response ) {   
      console.log( response )
    })
    .then( setTimeout(() => { getListings( e );}, 500 ) )

    return false
  }