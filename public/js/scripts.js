const submit = function( e ) {
      // prevent default form action from being carried out
      try {
        e.preventDefault()
      }
      catch {
        //If I forced the submit button on window load just continue, this was not a form submission
      }

      const number = document.querySelector('#score');
      const date = document.querySelector('#date');
      const input = document.querySelector( '#name' ),
            json = { name: input.value, date: date.value, score: number.value },
            body = JSON.stringify( json )

      fetch( '/submit', {
        method:'POST',
        body 
      })
      .then( function( response ) {
        
        // do something with the reponse 
        console.log(response.json().then((data) => {
        responseJSON(data);
        }));;
        console.log( response )
      })

      return false
    }

    function responseJSON(json) {
      console.log(json);
      var table = '<tr><th>Name</th><th>Score</th><th>Date</th><th>Generated Name\/Score</th></tr>';
      for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        console.log(obj);
        console.log(obj[0]);
        table+="<tr><td>" + obj['name'] + "</td><td>" + obj['score'] + "</td><td>" + obj['date'] + "</td><td>" + obj['formatted_score'] + "</td></tr>";
      }
      document.getElementById("highscores").innerHTML = table;
    }

    window.onload = function() {
      document.getElementById('date').valueAsDate = new Date();
      const button = document.querySelector( 'button' )
      button.onclick = submit
      submit();
    }