function handle_add(){
    //The following source showed me how to extract values from a
    //form: https://www.w3schools.com/jsref/coll_form_elements.asp
    const input = document.getElementById("add"),
          json = {
              kills: input.elements[0].value,
              assists: input.elements[1].value,
              deaths: input.elements[2].value,
          },
          body = JSON.stringify(json);

    fetch( '/add', {
        method:'POST',
        body
    }).then( function( response ) {
        if(response.status === 200){
            getLatestTable();
        }
        return true;
    })

    return false;
}

function handle_modify(){
    const input = document.getElementById("modify"),
          json = {
              id: input.elements[0].value,
              kills: input.elements[1].value,
              assists: input.elements[2].value,
              deaths: input.elements[3].value,
          },
          body = JSON.stringify(json);

    fetch( '/modify', {
        method:'POST',
        body
    }).then( function( response ) {
        if(response.status === 200){
            getLatestTable();
        }
        return true;
    })

    return false;
}

function handle_delete(){
    const input = document.getElementById("delete"),
          json = {
              id: input.elements[0].value
          },
          body = JSON.stringify(json);

    fetch( '/delete', {
        method:'POST',
        body
    }).then( function( response ) {
        if(response.status === 200){
            getLatestTable();
        }
        return true;
    })

    return false;
}

function getLatestTable(){
    fetch( '/table', {
        method:'GET'
    }).then( function( response ) {
        if(response.status === 200){
            updateTable(response);
        }
        return true;
    })

}

function updateTable(response){
    //Delete existing table and add a new, empty one. The following
    //source have me the idea of swapping the tbody element of the
    //table, and showed me how to do it:
    //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
    let table = document.getElementById("results");
    let newBody = document.createElement('tbody');
    table.replaceChild(newBody, table.lastChild);

    //The following source showed me how to extract json from the HTTP
    //response: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
    response.json().then(data => {
        //The following source was used to learn how to insert a row into
        //a table in JS: https://www.w3schools.com/jsref/met_table_insertrow.asp
        let numRows = data.numRows;
        let rows = data.rows;
        for(let i = 0; i < numRows; i++){
            let newRow = newBody.insertRow(i);
            newRow.insertCell(0).innerHTML = `${rows[i].id}`;
            newRow.insertCell(1).innerHTML = `${rows[i].kills}`;
            newRow.insertCell(2).innerHTML = `${rows[i].assists}`;
            newRow.insertCell(3).innerHTML = `${rows[i].deaths}`;
            newRow.insertCell(4).innerHTML = `${rows[i].kd_ratio}`;
            newRow.insertCell(5).innerHTML = `${rows[i].ad_ratio}`;
        }
    });
}