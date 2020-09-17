Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## FPS Stat Calculator
Link to application: https://a2-joeswetz.glitch.me

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

**Important Note**: I added an extra feature where the user can click 
"Download as CSV" and the contents of both tables will be downloaded to the 
user's computer as a file called "stats.csv." I know this was not a 
requirement, but I just wanted to do it for fun! However, to learn how to do
this, I had to do some research, and I ended up using some code from stack
overflow. Since this was not an actual assignment requirement, Professor Roberts
said it was OK as long as I cite it and mention this in the readme. This code is 
in handle_csv() in ./public/js/scripts.js. In that method, I put a comment 
crediting the source, as well as my own explanation to prove my understanding of 
it. The comments that start with "OA" are comments from the original post by the
Original Author, and I took out the => notation and made that part fit my coding 
style (cause I didn't like the => notation). 

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
    the derived fields "kill/death ratio" and "assist/death ratio" in the function
    calculateKDandAD(). The totals and averages for kills, assists and deaths are 
    computed in the function calculateTotalsAvgs().
    - The derived fields are the kill/death ratio and assist/death ratio fields,
    which use the kills/deaths fields and assists/deaths fields respectively. The
    total and averages for kills, assists and deaths also use all the data in
    the table.
- **HTML**:
    - I used 3 HTML forms: one each for add, modify, delete.
    - To display results, I used two HTML tables: One for each set of stats
    the user enters in (for each game), and then one table for the running 
    total and average of kills, assists, deaths.
    - ./public/index.html has been validated with the link given in the 
    assignment description.
- **CSS**:
    - All the primary visual elements of the application have been styled with
    CSS. Each elements has style rules in ./public/css/style.css.
    - In ./public/css/style.css, Element, ID, and Class selectors have all been 
    used (Ex: h1, .app-item, #add).
    -The three forms and two tables are inside a flex box for formatting. The 
    div item with class "appgrid" has "display: flex" to contain these elements.
    -All text uses the font Inconsolata from Google Fonts. It's linked into 
    index.html at line 7, and set as the font family for all text on line 7 .of 
    public/css/style.css
    -The CSS is all maintained in the external stylesheet ./public/css/style.css
- **JS**:
    - Front-end JS is located in ./public/js/scripts.js to fetch data from the
    server.
    - Back-end JS for the Node.js HTTP server is located in server.improved.js 
    to return files and table data.

Project can be found on glitch at the following link:
http://a2-joeswetz.glitch.me

## Technical Achievements
- **Real-Time Update**: The tables in index.html update automatically as the
contents change based on the user input. Whenever the user makes an add, modify, or 
delete request, the server returns a list containing the current contents of the tables.
There is also a request API call that gets the contents of the table when the HTML body
has loaded.

## Design/Evaluation Achievements
I tested the program with two different students in CS4241 according to the design
achievement description. You'll find the list of tasks below as well as my answers to the
questions for each user. I think these tasks were so simple (since the application itself
is so simple) that there wasn't really a lot of thinking aloud. The users just went and did
it very quickly. So I apologize if the tests were not ideal, but I did get some useful 
feedback, as well some important bug catches. All bugs that were found from testing were
fixed before submitting.

###Test Tasks
These were the tasks given to each user.

1.) Add a few rows of game stats to the table.

2.) Modify one of the rows of stats.

3.) Delete a row of stats.

4.) Download the table data as a CSV file and verify the contents match
the data in the tables.

###Test 1
1.) **Participant Last Name:** Hunt	

2.) **What problems did the user have with your design?**
	An error occurred that result in the values in the table being null.
	I acknowledged this out loud, not thinking it would interrupt the test. 
	The user then said they didn't even see the totals and averages table
	at the bottom of the UI in the first place. Considering the user didn't
	see the table, I consider it a UI problem since the user's view should
	be immediately drawn to the table.
	
3.) **What comments did they make that surprised you?**
	When modifying a row of stats, they said they were going to leave fields
	that they didn't want changed empty (so they wanted to modify assists, so they
	left the "# kills" and "# deaths" fields of the form empty). This was not
	actually supported.
	
4.) **What would you change about the interface based on their feedback?**
	I would move the table that displays totals and averages somewhere else, probably
	higher up on the screen so the user sees it when they see the other table.

###Test 2
1.) **Participant Last Name:**  Desveaux
	
2.) **What problems did the user have with your design?**
	The user was able to successfully complete the tasks without any struggle. 
	However, they did try to put 0 for deaths, which didn't work since,	after the 
	first test, I did some bug fixes. I consider this a design problem since the
	design should have informed the user about why the provided stats were not added 
	to the table. They didn't really think-aloud because they just instantly knew what 
	form to use and added the data.
	
3.) **What comments did they make that surprised you?**
	I was surprised that the user genuinely tried to put 0 deaths for one of the
	games. I forgot this is an actual valid value and should therefore be put in the table.
	After the first test, I made it so 0 deaths was not allowed since you can't divide by
	0. In reality, 0 deaths is a valid value and in FPS games, when there are 0 deaths the 
	K/D = # kills and the A/D = # assists.
	
4.) **What would you change about the interface based on their feedback?**
	I would some sort of error box that gives the user an informative message explaining
	why their row of stats was not added to the table (i.e. negative number, unrecognized
	character, etc.).

