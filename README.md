Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 16th, by 11:59 PM.

Maria Medina Martinez
http://a2-mamedi.glitch.me

## Classic Car Wishlist
This web app allows a user to keep track of the classic cars they love in the hopes that one day they can buy them. A user can enter the Make, Model, Year, and Price of a car and the app will calculate a priority for that vehicle. The priority indicates how desirable it is for the user to purchase the car with a priority of 1 indicating they should jump on the deal. 

### HTML
Used a form to get the user's input and displayed the exisitng data in a table that updates on submission.
### CSS
For my layout, I utilized a CSS grid as well as some flex elements to order some of the grid's children (such as the sidebar). Additionally, I used class selectors to style and identify the primary grid-areas, id selectors for my table/buttons, and element selectors for the table inputs and the entire body. The fonts Chivo and Abel were used for this site. The CSS was kept in an external style sheet.
### JS
Used GET, POST, DELETE, and PUT methods to fetch data from the server.
### Node.js
Server maintains track of data and performs derivation operation to calculate priority, Any modification to the data is done through the server.

## Technical Achievements
- **Tech Achievement 1**: Single page app
    - On posting data to the server, the server sends back the response json the client then parses and uses to update the results table. This is done through the updateTable function where a new entry is created in the table for each json object returned to the client. On loading the page, the table is prepopulated with three rows that the user can interact with.

- **Tech Achievement 2**: Add, delete, and modify 
    - The web app allows a user to add data through the form as well as delete specific rows through the use of the buttons associated with each row. A user can also modify each row and save their changes. This will overwrite the previous row data in the server and persist across page reload.

### Design/Evaluation Achievements
- **Design Achievement 1**: Classmate test
    - Name: Gabriel Aponte
    - What problems did the user have with your design?
        - 
    - What comments did they make that surprised you?
        - 
    - What would you change about the interface based on their feedback?
        - 
