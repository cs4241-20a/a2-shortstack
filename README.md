Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
Saniya Syeda

Link: <https://a2-ssyeda422.glitch.me/>

## Which Bob Ross Painting Are You?
This application is a short quiz to determine which Bob Ross painting represents you best. The CSS grid layout was used for formatting the quiz. To get your result, answer the quiz questions and click "Get Results!"


## Technical Achievements
- **Calculating Quiz Results**: This app takes in the input from the user's quiz results and then based on this input, will tally up points for each answer; for example, if the user answers "Ocean" for one of the questions, the tally for the painting labeled "beach" go up by one. There are four different Bob Ross Paintings a user could receive as a result, so the painting that has the highest tally at the end will be the result. This was a challenge in terms of being able to read through the JSON as an array and creating switch statements for each question. Another challenge was being able to access the results in my scripts.js file and creating switch statements for those as well. Both the scripts.js and server maintain a counter to keep track of the array index with each new submit by the user.

### Design/Evaluation Achievements
- **Visibility**: Since this app will display a painting based on the user's input, I formatted the HTML so that all of the painting visibilities are initially set to "hidden." Then, once a response is received from the server, scripts.js will index into the array, access the result names, and then change the visibility of the corresponding painting to "visible".
- **Z-Index**: To make sure all of the paintings would show up around the same position, I placed the paintings on top of eachother using z-index and set visibilities accordingly.

Notes: 
- In scripts.js, I use a function to try and create a table with the server results in a new HTML page (results.html). However, when I try to access the table element, the console shows an error saying it is "null". For this reason, I just printed the results to the console.
- When validating the form, I tried to use the "required" tag for each input element; however, when I do this and click submit with onClick (not onclick), it shows a 404 Error, even though my method is POST. I'm not really sure why this happened or why changing the onclick to onClick created such an error, but I wanted to mention this as my form is not able to validate this way. I'm sorry for the inconvenience, hopefully at some point I can find out what went wrong but for now I'm not sure.