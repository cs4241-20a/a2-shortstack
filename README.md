Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 16th, by 11:59 PM.

Link to Glitch project: https://a2-nparker2020-noah-parker.glitch.me/

## Graphr.js
My Web Application Title is Graphr.js. It is a very simple graphing-calculator applet, that can take functions of x in the mx+b form in a text box, and display the graphed function on a grid of square div elements, arranged in a grid using <b>CSS grids</b>.  


Notes:  

The math parser is quite basic, only functions of the form mx + b will work. x may be given an exponent using the ^ character. e.g.: 2x^1.2 + 5 is a valid function.
When the submit button is pushed, the function will be sent to the Node.js server to be added to a list.
The "My Functions" list displays the functions currently stored in the Node.js server.

Clicking on functions in the "My Functions" list will cause the clicked function to be graphed.

CSS:  

  The graph was implemented using the CSS grids framework.  
  The applet uses the Google Fonts "Oswald" font.  
  The css/styles.css file contains CSS stylings with Element, ID, and Class selectors  


Javascript:  
  All of the code to parse functions, and graph them, is written in Javascript and contained in the js/scripts.js  
  Additionally, the javascript on the front end makes GET and POST requests to the Node backend to both push and fetch data from the server.   



## Technical Achievements
- **Tech Achievement 1**: Using a combination of POST and GET requests, functions submitted by the user are added to a server-side list. When the page loads, the list of functions is requested by the web-page. The "My Functions" list always shows the current state of the Server-side data. When a new function is submitted to the server, the server will respond with the interpreted JSON object based on the submitted function.

### Design/Evaluation Achievements
- **Design Achievement 1**: Student UI Testing. I completed user testing with another student in the class.  
Student/Testing Info:  

1.) Sullivan  
2.) The user initially was confused with the "My Functions" list, as the styling makes it look somewhat like a text-box for input.  
The student tester also wished there were instructions on how to use the grapher, after they had completed the task.  
3.) The comment regarding the function in the list resembling a text box was surprising, but after thinking about it, it is understandable.  
4.) I think I would add a detailed description/manual for how to use the grapher, and improve the styling of the "My Functions" list to make it look less like a search bar.
