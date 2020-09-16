# Gabe's Coursework TODO List
- https://a2-gabrielaponte.glitch.me/
- This website is a nice and simple way for me to keep track of my class assignments and MQP deadlines!
- To use: Simply state the Course Name, the Assignment/Task, its Due Date, and the Effort to complete it (1=least - 5=most)
- A priority will be automatically assigned based on the Due Date and the Effort of the assignment.
- I used a combination of row based and column based Flexboxes within my style.css file to position the elements in the UI.
- **NOTE**: I used the HTML5 input type datetime-local. This input type is not supported on Mac Safari or IE. For the best experience, use a good browser such as Chrome, Firefox or Edge.

## Baseline Requirements
**Server**:
- Modified the server.improved.js file to send and receive files / data as needed.
- It also holds all my TODO List information as a JSON object inside the appData variable. This data contains five fields (CourseName, Task, DueDate, Effort and Priority)

**Results**:
- All of the data stored on the server is displayed in an HTML table that is updated in real-time without reloading the whole page.

**Form/Entry**:
- The UI utilizes a form that allows users to add a TODO item by specifying the Course Name, Task, Due Date and Effort of the item. This data is then stored on the server.

**Server Logic**:
- Upon receiving new TODO list data, the server adds the new field of Priority to the data.
- Upon pressing the delete buttons, the server is updated and removes all the information for the specific task that needs to be deleted and the table is updated to reflect the deletion.

**Derived field**:
- The Priority field has its value derived inside the server based on the Effort and Due Date value from the latest TODO item. This can be seen in the function calculatePriority (dueDate, effort).

**HTML**:
- One HTML form that utilizes the text input, datetime-local input and select input tags to retrieve User inputs.
- Use of an html <table> to display all the data stored in the server.
- All pages [validate](https://validator.w3.org).
  - The warning for having a placeholder for datetime-local is expected. I added this placeholder so that users on IE or Mac Safari know what to input into the field since the datetime-local input is replaced by a text input on those not so modern browsers.

**CSS**:
- All primary elements are styled via the style.css external file
- Various CSS Selector functionality are demonstrated:
  - Element selectors are used to style most elements.
  - ID selectors are used to style all of the text in the TODO list table with the css for #tasks.
  - Class selectors are used to style the table column widths, the table itself and the input UI elements.
- CSS positioning and styling for the primary visual elements in the application:
    - Use of Flexbox with a direction of column for the body of the whole site.
    - Use of Flexbox with a direction of row for the input UI elements.
    - All font is set to Montserrat from [Google Fonts](http://fonts.google.com/).
- CSS is defined in a maintainable, readable form, inside the style.css stylesheet.

**JavaScript**:
- JS code separated from the html file and  stored in the scripts.js files.
- JS used to control sending and receiving data to and from the server. Also used to populate the TODO list table with new data added by the user.

**Node.js**:
- An HTTP Server that delivers all necessary files and data for the application.
- Modified to add a new field to the inputted data a swell as to calculate the value for that field.
- Added the moments.js library to manipulate datetime calculations.

## Technical Achievements
**Create a Single-Page app**: My website is only one page.
- There is a form that takes in user input for Course Name, Task, Due Date and Effort. This data is then sent to the server and, after modification, the server sends back the updated data and the data is displayed in real-time inside a table located on the same screen.
- The page does not need to be reloaded in-order to show the new data.
- Data persists on page reload, the data will only disappear if the server is reset.

**Manipulate the Server Data in Multiple Ways**: My website allows for adding and deleting individual tasks in the table.
- You can add new tasks by using the form input functionality. This data is sent and stored on the server.
- You can delete individual tasks in the table with the delete buttons. This updates the data stored on the server and removes the correct task.

## Design/Evaluation Achievements
**Test UI with Classmates**:
(one to two sentences for each question) address the following in your README:
1. Provide the last name of each student you conduct the evaluation with.
  - Maria Medina Martinez
2. What problems did the user have with your design?
  - She noticed that on minimizing the screen the table does not responsively center itself or implement a scroll bar functionality. The user must pan over the entire screen to see the table.
  - On minimizing the screen excessively, the first input field is cut off and the user cannot see what they input.
3. What comments did they make that surprised you?
  - I was extremely surprised that she liked my color palette given that it stayed the same from project 1.
  - She liked the overall design of the site and thought it was aesthetically pleasing and intuitive.
4. What would you change about the interface based on their feedback?
  - I would add a resizing element to the table so that the user does not have to scroll over with a minimized screen. Additionally I would modify the placement of the first input box so that it is not cut off from the screen.
