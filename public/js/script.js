//creating a close button and appending it to each list item
var items = document.getElementsByTagName("li");

for (var x = 0; x < items.length; x++) {
  var text = document.createTextNode("\u00D7");
  var span = document.createElement("span");
  
  span.className = "close";
  span.appendChild(text);
  items[x].appendChild(span);
}

// displays check on lefthandside of completed item
var list = document.querySelector("ul");
list.addEventListener("click", function(ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
}, false);

// close button functionality
var close = document.getElementsByClassName("close");

for (var x = 0; x < close.length; x++) {
  close[x].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// add new list item
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("Can't be blank, dog");
  } else {
    document.getElementById("items_ul").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (var x = 0; x < close.length; x++) {
    close[x].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
