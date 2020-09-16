
## My Web Application Title: foo Scheduler
Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.
This project is designed as a scheduler. On the top left connor, there is the date of today. The user can input a event starting today and a duration they plan for this event.
The front end will send these data to the server and store the data there. A list and a table will show the updated todo list immediately. 
When the page refreshed, the data is still there if the server did not start again. The pre-entered data will display as the window is loaded. 
When 2 or more devices is using the page, all of the data is recorded. 
I used grid to align the page. I created a lot of css selectors. A form is used to take input from the front end. 
## Technical Achievements
- **Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. **

When the user submits data, the server should respond sending back the updated data (including the derived field: due date calculated on the server) and the client should update its data display.

The submitted data is stored on the server as it is always displayed even when the page is reloaded. 

### Design/Evaluation Achievements
Testing with the following fields:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?
- **Student 1**: 

1. Song
2. The date and the weekday is overlapping on her device. 
3. She thought that I added a database for the assignment. 
4. I put the date and weekday into grids so hopefully they won't overlap again. 

- **Student 2**:

1. Chen
2. She asked why do I have a list on the left side and a table on the right side. I told her in my original plan I want the left side only showing incompleted tasks due today while the table on the right shows everything. 
3. She helped me found out that my data on the server actually stores for different devices. 
4. I tried my original plan for a while and I gave up. Maybe next time. 