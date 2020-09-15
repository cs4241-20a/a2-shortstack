Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## TODO - Task Manager
- I created a very simple TODO application which allows you to enter a name, description, and priority for each new individual task which is then displayed in a table.
- Due dates are automatically generated for each task based on the priority that was entered and you are able to delete tasks by pressing the 'Delete' button associated with it.
- Utilized flexboxes to ensure that the UI of the application scales to the user's web browser

## Baseline Requirements

Server:
- My server stores all of the application data containing user's task related fields as a JSON object
- Server is able to modify and send existing data while also being able to receive new data.
- The deadline field is generated on the server, by looking at the priority of the task and adding a set amount of days to the current date

HTML:
- Single HTML form to take in user input that is then stored on the server
- All the currently available data on the server is disabled below the form as a table
- All pages validate

CSS:
- Utilized ID, element, and class selectors
- External stylesheet
- The elements of the table and form are positioned using centered column flexboxes
- Font is Sans-Serif from Google Fonts

JavaScript:
- Utilized JavaScript in order to fetch/store data to/from the server as well as to send requests to delete a specific task.
- Moment.js library used to get the current date to be used in the generated deadline field

Node.js
- HTTP server now delivers application data to be rendered in html as well as files

http://a2-hctrautz.glitch.me

## Technical Achievements
- **Tech Achievement 1**: My application is rendered all on one page, stores data until each restart, and allows users to add/delete tasks in realtime
