Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## FPS Stat Calculator
This application allows the users to enter in their kills, assists, and
deaths from multiple rounds of an FPS game, and it then calculates and 
displays all these stats, as well as derived stats, to the user. The data
can then be exported as a CSV file, so users can open it in Excel and 
create graphs to help evaluate their performance.

The main challenge I sought to solve with this application was to easily
keep track of and analyze one's performance in a game without have to write
stats down by hand or do a bunch of math. This makes it easy for the user
to see stats and create graphs for themselves to further improve their
skills.

I satisfied the requirements for the assignments in the following ways:
- **Functionality**:
    - The server in server.improved.js serves the necessary files as well as 
    maintains a table of statistics in the "appdata" variable. The API supports
    calls to add, modify and delete items from the table, as well as request for
    all the data in the table.
    - The results functionality has been implemented on the same page as the rest
    of the application, as described in the assignment description for the 
    Technical Achievement.
    - The form/entry functionality is implemented with the three forms on the left
    side of the UI: one form each for add, modify and delete.
    - The server logic requirement is satisfied in the addItem() and modifyItem()
    functions which, in addition to adding the provided data to table, calculates 
    kill/death ratio and assist/death ratio by dividing the corresponding fields.
    The totals and averages for kills, assists and deaths are computed in the 
    function calculateTotalsAvgs().
    - The derived fields are the kill/death ratio and assist/death ratio fields,
    which use the kills/deaths fields and assists/deaths fields respectively. The
    total and averages for kills, assists and deaths also use all the data in
    the table.
- **HTML**:
    - I used 3 HTML forms: one each for add, modify, delete.
    - To display results, I used two HTML tables: One for each set of stats
    the user enters in, and then one table for the running total and average
    of kills, assists, deaths.
    - /public/index.html has been validated with the link given in the 
    assignment description.
- **CSS**:
    - All the primary visual elements of the application have been styled with
    CSS. Each elements has style rules in /public/css/style.css.
    - In /public/css/style.css, Element, ID, and Class selctors have all been 
    used (Ex: h1, .app-item, #add).
    -A flex box was used to place the three forms and two tables. The div
    item with class "appgrid" has "display: flex" to contain these element.
    -The ___ font was used for all text. It's imported in on line ___ of
    index.html.
    -The CSS is all maintained in the external stylesheet /public/css/style.css
- **JS**:
    - Front-end JS is located in /public/js/scripts.js to fetch data from the
    server.
    - Back-end JS for the Node.js HTTP server is located in server.improved.js 
    to return files and table data.

http://a2-joeswetz.glitch.me
        
## Technical Achievements
- **Tech Achievement 1**: Using a combination of...
- **Tech Achievement 2**: ...

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, the code...
- **Design Achievement 2**: We tested the application with n=X users, finding that...
