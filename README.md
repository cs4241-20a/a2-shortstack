
## To-do List
By Haley Hauptfeld
Project Summary: My application is a to-do list that adds data to an array on the backend. Users input their task, the level of priority that task has, and the date that it was assigned. Then, the program generates a new field called deadline, that tells the user what day they need to accomplish the task by based upon the level of priority they gave the task.

## Baseline Requirements
- **Functionality**:
I implemented a server in the file, 'server.improved.js'. In this file, I have an array called appdata1 that starts out empty, and I dynamically fill that array as tasks get put into the server through a POST request from the front-end. There are three pieces of data ('newitem', 'priority', and'assigneddate') that are put into a JSON object and stored in the server.

You can view the entire dataset residing in the server's memory either visually on the browser when the program is running, or view the the list of JSON objects stored in the dataset within the terminal when the program is running.

I have an HTML form in my front-end code that takes in a string ('newitem'), a number ('priority'), and a date ('assigneddate') as inputs and sends this information to the server through a POST request as a JSON object. Users can only add data. Unfortunately, they cannot modify or delete data.

I implemented server logic by adding one derived field from the data that already exists in the dataset. This new field is called 'deadline' and is meant to tell the user when they should finish their task.

The derived field, 'deadline', is computed based on fields that already exist in the row. In my server logic, I compute a date value for 'deadline' by adding the int value of the 'priority' data in that row to the date value, 'assigneddate' in the same row. This adds a certain number of days to accomplish the task. For example, if a user marks a task as having a priority of 1 (aka highest importance), it will be have a deadline of a day after it was assigned. If a user marks a task as having a priority of 5 (aka lowest importance), it will be have a deadline of 5 days after it was assigned.

- **HTML**:
As described before, I use an HTML form to gather input from the user. I use input tags with types, 'text', 'number', and 'date', to gain information for 'newitem', 'priority', and 'assigneddate' respectively.

I use a <table> tag to display the results of all data currently available on the server.

I have one HTML page and it is validated. A screenshot of the validation is shown in the file 'html-validation-screenshot.png'.

- **CSS**:
I use CSS to style the primary visual elements of my application.

In my file, 'style.css',
I use the following element selectors: 'body', 'th', 'td', 'form'
I use the following ID selector: '#todo-list'
I use the following class selector: '.header'

I used a CSS flexbox for the layout of my entire webpage.
I used the Google Font, Quicksand, to style all the text I used.
My CSS is written in a stylesheet that is separate from my HTML file.

- **JavaScript**:
I wrote some front-end JavaSCript to fetch the get/fetch the data that is passed when 'submit' is clicked
- **Node.js**:
I have an HTTP server in my file, 'server.improved.js'.

## Technical Achievements
- **Tech Achievement**: I created a single-page app that provides both a form for users to submit data and always shows the current state of the server-side data. The user can submit data, and the server responds by sending back the updated data that includes the derived field, 'deadline'. The client updates the data display.

### Design/Evaluation Achievements
- **Design Achievement 1**: Tested user interface with one other student in the class

I gave the user a task of entering three tasks in a to-do list, with three different priorities, but all of them have the same assignment date.

Provide the last name of each student you conduct the evaluation with: Jicha
What problems did the user have with your design?
The user did not seem to have any problems with my design. They might have been a little surprised by my cholor scheme, but they were able to complete the given task.
What comments did they make that surprised you?
They didn't really make any comments that surprised. The user liked that there was an example fo what to put inside the input box for the task.
What would you change about the interface based on their feedback?
I would probably change my color scheme so it's a little easier on people's eyes when they use the application.
