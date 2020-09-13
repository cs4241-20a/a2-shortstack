
function buildTable(data){
    var table = document.getElementById('myTable')
    for (var i = 0; i < data.length; i++){
    var row = `<tr>
    <td>${data[i].foodname}</td>
    <td>${data[i].datebought}</td>
    <td>${data[i].enjoy}</td>
    <td>${data[i].size}</td>
    <td>${data[i].placement}</td>
    <td>${data[i].dateuseby}</td>
    </tr>`
    table.innerHTML += row
    }
  }