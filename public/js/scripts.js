// Add some Javascript code here, to run on the front end.

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

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

  // Code for dark mode 
    var activated = false;

  const startDark = function () {

    // change bg color and text
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";

    // change header color
    document.getElementById('header').style.backgroundColor = "#121212";

    // change box colors
    var education = document.getElementById('education');
    education.style.backgroundColor = "#121212";

    var classes = document.getElementById('classes');
    classes.style.backgroundColor = "#121212";
    classes.classList.add("grid-container-1-dark");

    // change footer
    var footer = document.getElementById('footer');
    footer.style.backgroundColor = "rgba(177, 156, 217, 0.5)";
    footer.classList.add('grid-container-4-dark');
  }
  const startLight = function () {
    // change bg color and text
    document.body.style.backgroundColor = "#F7E3D4";
    document.body.style.color = "#342E09";

    // change header color
    document.getElementById('header').style.backgroundColor = "#FC7307";

    // change box colors
    var education = document.getElementById('education');
    education.style.backgroundColor = "#F7E3D4";

    var classes = document.getElementById('classes');
    classes.style.backgroundColor = "#F7E3D4";
    classes.classList.remove("grid-container-1-dark");

    // change footer
    var footer = document.getElementById('footer');
    footer.style.backgroundColor = "#342E09";
    footer.classList.remove('grid-container-4-dark');
  }

  function activateDark() {
    if (activated) {
      startLight();
      activated = false;
    }
    else {
      startDark();
      activated = true;
    }
  }