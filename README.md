Aditya Malik
http://a2-amalik3099.glitch.me

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
## To-Do List Application
This project is a to-do list webpage that gives users the ability to add tasks they need to complete, and determine what their timeline to complete it is. Users enter their task, a begin date, and a priority to complete. The webpage then generates an estimated date of completion based on the user's input data, and also displays how many hours they have left until the task is due for completion. For CSS positioning, I used the flexbox technique to determine the layout of elements on the page. I set display style to 'flex' and set the flex-direction to 'row' so that it would be easier for users to see the tasks and the derived feilds in the same line. To add a task to the to-do list, fill out the feilds in the header of the page. These are: task name, begin date and the priority level (Low, Medium or High). Once the feilds are filled in, click the submit button to add the task to your list. To edit a particular task, click the green Edit gitton for that task. You can then make any changes to the task name, priority, and begin date. Once you are done making changes, click the Edit button once more to confirm the changes. Based on the changes made, the calculated due date and the number of hours left till due will change accordingly. To remove a task from the list, click the red Remove button for that task. Color codes for the different feilds are listen in the webpage. 

### Technical Achievements
- **Single-Page Application**: Created a single-page application that allows users to add tasks to a to-do list, and always shows the current state of the server data. The user also has the ability to edit, and remove tasks from the list. Based on the data that the user enters (task name, priority, and begin date), derived feilds (estimated due date, and hours left till due date) are calculated. 

### Design/Evaluation Achievements
- **Design/UX Testing**: Tested user interface with other students
 - Student Evaluators: Abouaf, Patel
 - Problems with Design: When you click 'edit' it should automatically select and text and allow you to type immediately. You should not have to backspace previous text first. It is also confusing when you have to click 'edit' to edit and confirm changes. Not sure what the colors for each field represent. Also not clear what each derived feild is showing me. 
 - Surprising comments: instead of hover functionality for the edit and remove button, add indication of color from begining. Condense name because functionality is not matched with heading
 - Changes based on feedback: border color for edit and remove buttons. Shorter heading. Added a color rules text box at the top of the page that informs users what each color box represents and what data it contains

### HTML and CSS Achievements: 
- Results page displaying data currently on server
- CSS styling of primary visual elements including h,p,li,divs
- CSS selector functionality demonstrated with element selectors, ID selectors, and class selectors
- CSS Positioning with flexbox for layout. Defined display, flex-direction, justify-content, align-items, and text-align
- rules defined for p, h, and different input feilds in terms of fonts. Used google fonts roboto, monserrat, and Source Sans Pro

### Sources
- Hoverable buttons with custom borders. Source: https://www.w3schools.com/css/tryit.asp?filename=trycss_buttons_hover
- Calculating number of days btw dates: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
- To-do list: https://www.youtube.com/watch?v=Gp2bUX7_WIg