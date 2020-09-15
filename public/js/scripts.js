// Add some Javascript code here, to run on the front end.
var clickcount = 0;
document.getElementById('clickbtn').style.display="none";
document.getElementsByClassName('postgame').style.display="none";

console.log("Welcome to assignment 2!")


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )

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

  //when start button is clicked swap visibilities and start 30 second timer.
  function start() {
    document.getElementById('clickbtn').style.display="block";
    document.getElementById('startbtn').style.display="none";
    setTimeout(end(), 3000)
  }

  //increments number of clicks by 1 per click.
  function add() {
    clickcount += 1;
    document.getElementById('currentclicks').innerHTML = stringify(clickcount) + "Points";
  }

  //after 30 second timer is elapsed disable button and allow recording.
  function end() {
    document.getElementById('clickbtn').style.display="none";
    document.getElementsByClassName('postgame').style.display="block";

    //for loop here for checking if high score.
    //if high score: alert("Congratulations! You've bested the high score!")

    //else:
    alert("You've run out of time!");
  }

  


  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }