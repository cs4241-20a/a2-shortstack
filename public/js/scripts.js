/**
 * Send an /add API HTTP request to add a new game's stats to the
 * table. The stats are taken from the "add" form in index.html.
 * The updated stats are then displayed in total_avg_results and
 * results_list tables in index.html.
 *
 * @returns {boolean} true if server returned a 2O0 status code,
 *      false otherwise.
 */
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
    }).then(function( response ) {
        if(response.status === 200){
            updateResults(response);
            return true;
        }
    });

    return false;
}

/**
 * Send a /modify API HTTP request to modifies a game's stats by
 * setting them to the values in the "modify" form in index.html.
 * The updated stats are then displayed in total_avg_results and
 * results_list tables in index.html.
 *
 * @returns {boolean} true if server returned a 2O0 status code,
 *      false otherwise.
 */
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
    }).then(function( response ) {
        if(response.status === 200){
            updateResults(response);
            return true;
        }
    });

    return false;
}

/**
 * Send a /delete API HTTP request to remove a game's stats from
 * the table. The ID# of the game to remove are taken from the
 * "delete" form in index.html The updated stats are then displayed
 * in total_avg_results and results_list tables in index.html.
 *
 * @returns {boolean} true if server returned a 2O0 status code,
 *      false otherwise.
 */
function handle_delete(){
    const input = document.getElementById("delete"),
          json = {
              id: input.elements[0].value
          },
          body = JSON.stringify(json);

    fetch( '/delete', {
        method:'POST',
        body
    }).then(function( response ) {
        if(response.status === 200){
            updateResults(response);
            return true;
        }
    });

    return false;
}

/**
 * Send a /results API HTTP request to retrieve all the current
 * stats stored in the server. The updated stats are then displayed
 * in total_avg_results and results_list tables in index.html.
 *
 * @returns {boolean} true if server returned a 2O0 status code,
 *      false otherwise.
 */
function getLatestResults(){
    fetch( '/results', {
        method:'GET'
    }).then(function( response ) {
        if(response.status === 200){
            updateResults(response);
            return true;
        }
    });
}

/**
 * Downloads all the data from both tables as a CSV file called
 * "stats.csv".
 *
 * @returns {boolean} if stats.csv was successfully created
 *     and downloaded.
 */
function handle_csv(){
    /*
     * This source explained to me that you can't just use the "Content-Disposition"
     * header to download files from GET requests:
     * https://stackoverflow.com/questions/26737883/content-dispositionattachment-not-triggering-download-dialog
     *
     * The top answer from the following source taught me how to download
     * a file using fetch. It essentially says to download the response,
     * get the blob with the file data, create a URL to it, and then create
     * an <a> element that, when clicked, downloads the object at the URL,
     * which is our file. The code between lines 140-151 comes from this source,
     * and the comments that start with "OA" are comments from the original post
     * by that Original Author. The original post used arrow shorthand notation
     * but I changed cause I didn't like it :)
     *
     * https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
     */
    fetch( '/csv', {
        method:'GET'
    }).then(function(response){
          return response.blob()
    })
      .then(function(blob) {
          let a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = "stats.csv";
          document.body.appendChild(a);// OA: we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove();// OA: afterwards we remove the element again
          return true;
      });


    return false;
}

/**
 * Updates the contents of the total_avg_results and results_list
 * tables in index.html with the data in <b>response</b>.
 *
 * @param response an HTTP response with the data to be displayed in
 *     the total_avg_results and results_list tables in index.html
 */
function updateResults(response){
    //Delete existing table and add a new, empty one. The following
    //source gave me the idea of swapping the tbody element of the
    //table, and showed me how to do it:
    //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
    let table = document.getElementById("results_list");
    let newBody = document.createElement('tbody');
    table.replaceChild(newBody, table.lastChild);

    //The following source showed me how to extract json from the HTTP
    //response: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
    response.json().then(function(data) {
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

        //Now updates the boxes holding the totals and averages
        document.getElementById("total_kills").innerHTML = `${data.totals_avgs["total_kills"]}`
        document.getElementById("avg_kills").innerHTML = `${data.totals_avgs["avg_kills"]}`
        document.getElementById("total_assists").innerHTML = `${data.totals_avgs["total_assists"]}`
        document.getElementById("avg_assists").innerHTML = `${data.totals_avgs["avg_assists"]}`
        document.getElementById("total_deaths").innerHTML = `${data.totals_avgs["total_deaths"]}`
        document.getElementById("avg_deaths").innerHTML = `${data.totals_avgs["avg_deaths"]}`
    });
}