// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// Animate background color
var colors = ["red", "pink"];
var currentIndex = 0;

setInterval(function() {
  document.body.style.cssText = "background-color: " + colors[currentIndex];
  currentIndex++;
  if (currentIndex == undefined || currentIndex >= colors.length) {
    currentIndex = 0;
  }
}, 1000);


