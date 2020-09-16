var app = new Vue({
    el: "#app",
    data: {
      message: "Exotic Car Auctions",
      cars: [],
      showError: false,
      showSuccess: false
    },
    methods: {
      imgPath(make) {
        return `/images/${make.toLowerCase()}.jpg`
      },
      formatPrice(price) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        // Get rid of cents by splitting price on "." and taking first token.
        return formatter.format(price).split(".")[0];
      },
    }
  });

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const make = document.getElementById("make");
    const model = document.getElementById("model");
    const year = document.getElementById("yearPicker");
    const mileage = document.getElementById("mileage");
    const mpg = document.getElementById("mpg");
    const json = {
      make: make.value,
      model: model.value,
      year: year.value,
      mileage: mileage.value,
      mpg: mpg.value
    };

    // Check for input sanity, show error message if improper input
    if(model.value.length < 1 || isNaN(mileage.value) || mileage.value < 1) {
      app.showError = true;
      app.showSuccess = false;
    }

    // Otherwise, send data to server and display success message
    else {
      app.showError = false;

      const body = JSON.stringify( json )

      fetch( '/submit', {
        method:'POST',
        body 
      })
      .then( resp => {
        app.showSuccess = true;
        receiveData(resp);
      });
    }
    return false
  }

  function receiveData(response) {
    response.json()
    .then(function(data) {
      app.cars = data;
    })
  }

  window.onload = function() {
    const button = document.getElementById("submitButton")
    button.onclick = submit

    // Programmatically add years to yearPicker select tag
    const yearPicker = document.getElementById("yearPicker")
    for(let i = 2020; i >= 1970; i--) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = i;
      yearPicker.appendChild(opt);
    }

    // Programmatically add mpg choices
    const mpg = document.getElementById("mpg")
    // Realistically, none of these cars will ever reach 50mpg, but that's fine
    for(let i = 1; i <= 50; i++) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = i;
      mpg.appendChild(opt);
    }


    // Fetch existing state data from server
    fetch('/results/', {
      method: 'GET'
    })
    .then( resp => receiveData(resp) );
    
  }