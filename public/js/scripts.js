// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

///////////////INDEX.HTML FUNCTIONS////////////
//global var made in index but used in gamePage

var displayRapName = '';

const submit = function( e ) {


    var x = document.getElementById('yourname').value;
    var y= document.getElementById('favColor').value;

    //make sure text input isn't empty
    if (x == "") {
        alert("Please enter a username before continuing");
        return false;
    };
    if (y == "") {
        alert("Please enter a favorite color before continuing");
        return false;
    };
    
    //unhide div
    var T = document.getElementById("writeUsername");
    T.style.display = "block";

      // prevent default form action from being carried out
      e.preventDefault()

      const name = document.querySelector( '#yourname' ),
            color = document.querySelector( '#favColor' ),
            json = { name: name.value , color: color.value},
            body = JSON.stringify( json )

    //send input to the server
      fetch( '/submit', {
        method:'POST',
        body 
      })
      .then( function( response ) {
        // do something with the reponse 
        
        return response.json()
      })
      .then(function(json){
       
        var obj = json
        const { length } = obj;
       
        //display rap name in the div
        displayRapName = obj[length-1]['rapname'];
        document.getElementById('showName').innerHTML = "Your Rapper Name is " + displayRapName;
 
        getR
        })
     
      return false
    }


//////////////gamePage.html functions///////////////////

//headers for table
let headers = ['Name', 'Color', 'RapName'];

    
const getResults = function( e ) {

    //unhide div
    var T = document.getElementById("canvas");
    T.style.display = "block";

    //retrieve current data from the server
    fetch( '/submit', {
        method:'POST',
      
    })
    .then( function( response ) {
  
      return response.json()
    })
    .then(function(json){
        // do something with the reponse 
        //console.log( json )
        var obj = json
 
        //check if table exists
        //if it does, delete it before creating a new one
        if (document.contains(document.querySelector("table"))) {
            const table = document.querySelector('table');
            document.getElementById('canvas').removeChild( table );
        } 
        
        makeTable(headers, obj,document.getElementById("canvas"))
    
        return false;
    })

   
    return false
}

//creates dynamic table based on appData
function makeTable(labels, obj,container) {
    
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var theadTr = document.createElement('tr');

    //adding headers to the table
    for (var i = 0; i < labels.length; i++) {
        var theadTh = document.createElement('th');
        theadTh.innerHTML = labels[i];
        theadTr.appendChild(theadTh);
    }

    thead.appendChild(theadTr);
    table.appendChild(thead);

    //adding object elements row by row
        for (i = 0; i < obj.length; i++) {

            var BodyTr = document.createElement('tr');

            for (w = 0; w < labels.length; w++) {

                var bodyTd = document.createElement('td');
                //recognizes object.field by using the header array
                bodyTd.innerHTML = obj[i][labels[w].toLowerCase()];
               
                BodyTr.appendChild(bodyTd);
            }
            tbody.appendChild(BodyTr);
        }
    table.appendChild(tbody);

    //finally, adding the table to the webpage
    container.appendChild(table);
}

