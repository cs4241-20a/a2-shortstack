const statusMessages = ["All clear", "Be cautious", "Covid19 risk"]
  const newUser = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    const json = { 
	  userName: document.querySelector( '#userName' ).value,
	  userID: document.querySelector( '#userID' ).value,
	  userPassword: document.querySelector( '#userPassword' ).value,
	  userTemp: document.querySelector( '#userTemp' ).value,
	  userChills: document.querySelector( '#userChills' ).checked,
	  userCough: document.querySelector( '#userCough' ).checked,
	  userBreath: document.querySelector( '#userBreath' ).checked,
	  userThroat: document.querySelector( '#userThroat' ).checked,
	  userFatigue: document.querySelector( '#userFatigue' ).checked,
	  userHeadache: document.querySelector( '#userHeadache' ).checked,
	  userAche: document.querySelector( '#userAche' ).checked,
	  userNose: document.querySelector( '#userNose' ).checked,
	  userLoss: document.querySelector( '#userLoss' ).checked,
	  userNausea: document.querySelector( '#userNausea' ).checked,
	  userDiarrhea: document.querySelector( '#userDiarrhea' ).checked,
	  userStatus: 0
		  },
          body = JSON.stringify( json )
    
    fetch( '/newUser', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.text()
    })
    .then( function( text ) {
      var entries = text.split("},");
      console.log("Data:")
      var tableText = "<table><tr><th>Name</th><th>ID Number</th><th>Covid19 Status</th></tr>";
      for (const entry of entries) {
        var entryjson = JSON.parse(entry+(entry.slice(-1) == "}" ? "" : "}"));
        tableText += "<tr><th>" + entryjson.userName + "</th><th>" + entryjson.userID + "</th><th>" + statusMessages[entryjson.userStatus] + "</th></tr>";
        // console.log( entryjson );//can access elements with .elementName
      }      
      document.getElementById("database").innerHTML = tableText + "</table>";
    })

    return false
  }
  
  const update = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    const json = { 
      userName: document.querySelector( '#updateUserName' ).value,
      userPassword: document.querySelector( '#updateUserPassword' ).value,
      userTemp: document.querySelector( '#updateUserTemp' ).value,
      userPositive: document.querySelector( '#updateUserPositive' ).checked,
      userContact: document.querySelector( '#updateUserContact' ).checked,
      userChills: document.querySelector( '#updateUserChills' ).checked,
      userCough: document.querySelector( '#updateUserCough' ).checked,
      userBreath: document.querySelector( '#updateUserBreath' ).checked,
      userThroat: document.querySelector( '#updateUserThroat' ).checked,
      userFatigue: document.querySelector( '#updateUserFatigue' ).checked,
      userHeadache: document.querySelector( '#updateUserHeadache' ).checked,
      userAche: document.querySelector( '#updateUserAche' ).checked,
      userNose: document.querySelector( '#updateUserNose' ).checked,
      userLoss: document.querySelector( '#updateUserLoss' ).checked,
      userNausea: document.querySelector( '#updateUserNausea' ).checked,
      userDiarrhea: document.querySelector( '#updateUserDiarrhea' ).checked
      },
          body = JSON.stringify( json )

    fetch( '/update', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.text()
    })
    .then( function( text ) {
      var entries = text.split("},");
      console.log("Data:")
      var tableText = "<table><tr><th>Name</th><th>ID Number</th><th>Covid19 Status</th></tr>";
      for (const entry of entries) {
        // console.log(entry);
        var entryjson = JSON.parse(entry+(entry.slice(-1) == "}" ? "" : "}"));
        tableText += "<tr><th>" + entryjson.userName + "</th><th>" + entryjson.userID + "</th><th>" + statusMessages[entryjson.userStatus] + "</th></tr>";
      }      
      document.getElementById("database").innerHTML = tableText + "</table>";
    })

    return false
  }
  
  const reset = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    fetch( '/reset', {
      method:'POST',
      body: "{}" 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log("RESET")
      document.getElementById("database").innerText = "Database cleared.";
    })

    return false
  }

  window.onload = function() {
    const newUserButton = document.querySelector( '#newUserButton' )
    newUserButton.onclick = newUser
    const resetButton = document.querySelector( '#resetButton' )
    resetButton.onclick = reset
    const updateButton = document.querySelector( '#updateButton' )
    updateButton.onclick = update
    
    /* This collapsable code is based on the code found here: https://www.w3schools.com/howto/howto_js_collapsible.asp */
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }
