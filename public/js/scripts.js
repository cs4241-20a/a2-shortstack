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
    var header = document.getElementsByClassName('header')
    for (i = 0; i < header.length; i++) {
      header[i].style.backgroundColor = "#121212";
    }

    // change box colors
    var intro = document.getElementById('intro');
    intro.style.backgroundColor = "#121212";

    // change footer
    var footer = document.getElementsByClassName('footer');

    for (i = 0; i < header.length; i++) {
      footer[i].style.backgroundColor = "rgba(177, 156, 217, 0.5)";
      footer[i].classList.add('grid-container-4-dark');
    }
  }
  const startLight = function () {
    // change bg color and text
    document.body.style.backgroundColor = "#F7E3D4";
    document.body.style.color = "#342E09";

    // change header color
    var header = document.getElementsByClassName('header')
    for (i = 0; i < header.length; i++) {
      header[i].style.backgroundColor = "#FC7307";
    }
    // change box colors
    var intro = document.getElementById('intro');
    intro.style.backgroundColor = "#F7E3D4";

    // change footer
    var footer = document.getElementsByClassName('footer');

    for (i = 0; i < header.length; i++) {
      footer[i].style.backgroundColor = "#342E09";
      footer[i].classList.remove('grid-container-4-dark');
    }
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