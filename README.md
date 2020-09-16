
## Assigment 2 - Short Stack: To-Do list web application
This project aims to be a to-do list for students, where they can input a task and the amount of hours it will take to complete it. The server will save the date it was created and the priority of the task. 

This application allows for students to keep track of their tasks and time commitments, regardless of how many times they open or close the tab. This is achieved by saving the tasks in a JSON file. 

This application addresses the problem, but in its current state it cannot allow the user to edit previous tasks or selectively delete their tasks. The to-do list application also saves everyone's input in one JSON file, not allowing for personalized tasks. 

For future work, further fields for the tasks would be implemented, such as the class that each task is for. Further ways of modifying the already existing data would also allow the user to persolize their to-do list.

https://alvaradoblancouribe-a2-shortstack.glitch.me/

## Technical Achievements
- **Tech Achievement 1**: 
This application includes a form where users can submit the task name and the amount of hours they expect to spend on that task. Once submited, the server will create two additional fields, in which it will add the date it was created and the priority of the task, depending on how many hours the user will spend on the task. Once it's updated, the server returns the new task and it will be displayed on the screen. 

If the user decides to refresh the screen, the client will make a request to the server to gather all of the existing tasks that it has and display them on the screen.

If the user decides to delete the last task, the client will make a post request for the server to do so. Then, the client will remove all existing tasks from the display and replace them with an updated list. 

One of the most challenging parts of this project was displaying the tasks in the correct manner. It was a lot of trial and error with manipulaitng the DOM.

### Design/Evaluation Achievements
- **Test Interface #1**: 
1. Gilmore 
2. She was not sure what the amount of expected hours meant. She expressed that there were many different ways that someone could interpret it. 
3. I was surprised that the hours field was not obvious, which made me realize the flaw in the design. 
4. I decided to change the wording in the form to reflect more specific wording.

- **Test Interface #2**: 
1. Mahurkar 
2. She found the font too small
3. I didn't take into consideration how viewing the website on the monitor might drastically affect your ability to read the content of the website. 
4. I decided to make the font bigger so it is easier to read, given that the page has a fairly simplistic design the font can be larger. 
