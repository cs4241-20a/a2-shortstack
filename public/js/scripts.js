// Function to add a new book that the user inputs
// into the table in a new row
const addBook = function(book) {
  let table = document.getElementById("booklist");

  let newRow = table.insertRow(-1);
  let newTitle = newRow.insertCell(0);
  let newLength = newRow.insertCell(1);
  let newTime = newRow.insertCell(2);

  newTitle.innerHTML = book.title;
  newLength.innerHTML = book.pages;
  newTime.innerHTML = book.hours;
};

// Function to validate the user inputs
const validate = function() {
  const title = document.querySelector("#title"),
        pages = document.querySelector("#pages");
  
  if (title.value == '') {
    alert('Book title cannot be blank.')
    return false
  }
  
  if (pages.value < 1) {
    alert('Page # cannot be zero.')
    return false
  }
  
  return true
}

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();
  
  // Checks if inputs are valid and 
  // does not submit them if they are
  if (!validate()) {
    return false
  }

  // Creates a new JSON entry with the title and pages user
  // input info
  const title = document.querySelector("#title"),
    pages = document.querySelector("#pages"),
    json = { title: title.value, pages: pages.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // Takes the newly added entry and creates a new row with it
      let i = json.length - 1;
      addBook(json[i]);
      console.log(json);
    });

  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};
