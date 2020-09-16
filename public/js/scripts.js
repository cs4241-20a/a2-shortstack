// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    
    const name = document.querySelector( '#yourname' ),
          year = document.querySelector( '#year'),
          json = { yourname: name.value , year: year.value, age: "" },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      
      return response.json()
    })
    .then( function(json){
          console.log(json)
      let x = JSON.parse(json)
      rows.push(x.name, x.year, x.age)
          })
    
    
    return false
  }

  window.onload = function() {
    console.log("Hello");
    const button = document.querySelector( 'button' )
    button.onclick = submit;
  }
  var rows = [{ 'name': 'Matt', 'year': 1998, 'age': 22 },
  { 'name': 'Jared', 'year': 1999, 'age': 21 },
  { 'name': 'Alec', 'year': 1998, 'age': 14}]
    
    //rows.push(name,year,age);
    var html = "<table border='1|1'>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].year+"</td>";
        html+="<td>"+rows[i].age+"</td>";
        
        html+="</tr>";

    }
    html+="</table>";
document.getElementById("box").innerHTML = html;
    var table = "<table border='1|1'>";
    for (var i = 0; i < data.length; i++) {
      table+="<tr>";
      table+="<td>"+data[i].name+"</td>";
      table+="<td>"+data[i].year+"</td>";
      table+="<td>"+data[i].age+"</td>";
      
      table+="</tr>";
    }
    table+="</table>";
    document.getElementByID("box").innerHTML = table;

  </script>