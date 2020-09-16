README.md
===

CS 4241: Webware Assignment 2: Short Stack
---

### Author: Eric Reardon

**Live App Link**: https://a2-ejreardon.glitch.me

# Grocery List WebApp
My Grocery List WebApp is a single page web application that allows the user to dynamically add and delete items from their list.
All a user needs to do is fill in each section (food name, food category, price/unit, quantity), and the application will send the
information to the server. From here, the app will "derive" the aisle the food will be in based on the food category, send a get request
to get the updated server data, and update the table on the client side. Failure to input all criteria, enter a negative number, or enter a non-whole quantity will not allow a user to complete the request.
The "Add Row" button is how a user submits data, and the "Delete Row" button is how a user deletes data. The front end table will show a successsful
add or delete. From the displayed data, the webpage also displays the total count of items and total price.

To reset the data, you can manually delete each row after adding it or clear all by clicking the "Reset" button.

## Technical Achievements

My Grocery List WebApp satisfies all Technial Achievements and requirements.
I've created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. 
When the user submits data, the server responds back the updated data and derived field and displays it in the client.

**Node.js**
- A server.improved.js file which not only serves files, but also maintains a tabular dataset with 5 fields.
- The server has a '/results' functionality for a GET request which returns the entire dataset residing in the server's memory

**HTML**:
- The first row of my table holds the inputs for my Form, which allows a user to add data to the server's memory.
Because forms aren't supposed to be declared in tables, I found a work-around by declaring the form outside the table and using
the 'form' attribute inside each input.
- I use the `<table>` tag for to display the information retrieved from the '/results' functionality
- My page validates from the [validator site](https://validator.w3.org).
Having `action=""` inside the form was from a code example in class and in the starter code, so I am assuming this is okay. 

**CSS**:
- All of my CSS is in an external stylesheet in the css folder.
    - I used the `font-family: 'Cinzel', serif;` from [Goolge Fonts](https://fonts.google.com)
    - I used the color scheme below from [Adobe Color](https://color.adobe.com)
    <img src="https://cdn.glitch.com/b94fec47-8dd4-476b-97f7-f5134da5b7ed%2FScreen%20Shot%202020-09-15%20at%207.36.44%20PM.png?v=1600213007531">
- Used the following CSS Selectors:
    - Element selectors: body, table, th, tr, td, input
    - ID selectors: #addButton, #totalprice, #totalcount
    - Class selectors: .tableInput, .buttonColumn, .deleteButton, .flex-container
- CSS positioning and styling of visual elements:
    - I used three flex boxes to make the Total Price and Total Quantity boxes above the table. The first flex box, the flex-container, is centered and contains the other two.
    The two child flex boxes use flex-direction: column to display the text vertically.

**Javascript**:
- My Javascript files contain `Server Logic` which updates data in the server's memory and adds a derived field to the incoming data before integrating it with the existing dataset.
- The `Derived field` (grocery aisle) for a new row is computed based on the food category that is given as input.
- Simple get / fetch / delete data functionality from the server

### Design/Evaluation Achievements
- **Design Achievement 1**: 
*Design/UX*
- I've tested my interface with two other students in the class by defining a task and using the think-aloud protocol.
---
1. Provide the last name of each student you conduct the evaluation with.
    - **Sullivan**
2. What problems did the user have with your design?
    - **On the Technical side, he noticed that I did not handle negative prices or quantities.
    This made it so that the user could alter data in a way that is not realistic for a Grocery List.
    Additionally, if the price became too high, the total price text would exceed the Flex box because i gave it a defined width.
    Once i corrected this, he noted that the Total Count and Price boxes looked a little awkward because they "hugged" the text
    so closely**
3. What comments did they make that surprised you?
    - **The only comment that surprised me would be that although I used a color scheme from Adobe, the shades of blue can be
    a little overwhelming**
4. What would you change about the interface based on their feedback?
    - **It was very helpful to note the bugs that he caught. Although I did not change anything on the design side,
    I did fix and address all of the bugs noted in question 2**

---
1. Provide the last name of each student you conduct the evaluation with.
    - **Morrissey**
2. What problems did the user have with your design?
    - **On the Technical side, he also noticed that negative prices and quantities were not handled correctly, like the previous
    student noted. Additionally, he caught that I did not handle rounding correctly, and a user could input prices with too many
    decimal places. Enough of these would make the total price have a decimal value so long that it would also exceed the box.
    As for the interface, he reccomended a 'reset' button that would allow the user to more easily delete data instead of
    individually deleting each row, which is a big inconvenience to the user**
3. What comments did they make that surprised you?
    - **The reset button was a great idea that I did not think of. Additionally, he told me that a simpler color scheme can also be
    better. This comment, in addition to the previous, made me realize that a great webpage should not be too 'much' on the user's eyes**
4. What would you change about the interface based on their feedback?
    - **Based on the feedback, I fixed the bugs and also added a reset button for user convenience. For future projects, I will likely
    go with a more basic color scheme, and utilize more black&white based themes**