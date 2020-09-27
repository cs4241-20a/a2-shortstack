Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Jordan Stoessel

https://glitch.com/~a2-jordanstoessel

This assignment aims to introduce you to the concepts and practice involved in creating a prototype (i.e. not deployment ready) two-tiered web application. The baseline aims of this assignment involve creating an application that demonstrates the use of several specific pieces of HTML, CSS, JavaScript, and Node.js functionality.

---

## Speed Clicker
This is my project game for assignment 2. The game is a challenge to see how fast you can click under a self-defined amount of time. The main aspect is determining the clicks per second where the top winner will be placed as #1. The main challenge is to try and beat the incredible "Mr. Insano". 
Note: "Mr. Insano"'s stats are based on "Dylan Allred"'s record on "Recordsetter". 

The CSS positioning technique that was used was justifying content to the center such that everything is easier to see. 

Instructions: The first step is to define the amount of seconds you would like to be able to click. Next, click the start button. A red image will appear that reads "Click Here". This image will remain for the self-set time. Every click that is done is equivalent to 1 point. Try to reach a high score! After the self-defined time limit is reached, you may enter your name to be placed onto the leaderboard. Try your best to defeat the incredible "Mr. Insano". 

## Technical Achievements
- **Tech Achievement 1**: 
The webpage is a single-page app which needs no reloading to showcase updates from the server. When a user players, stores, or deletes on the webpage, they will not be taken to a different page. The webpage also is able to add AND delete information. Adding can be done after playing and reaching a score greater than 0. Deleting can be done by typing in the exact name (capital sensitive) of the player that is to be deleted from the leaderboard. This is done by updating the server and altering the front-end's visuals in real-time.

- **Tech Achievement 2**: 
 The leaderboard is sorted by clicks per second in case users were registered under differing playtimes (seconds). This was an achievement because it required understanding of the sort method along with selecting specific parameters (clicks per second) to accurately sort.
 
 - **Tech Achievement 3**: 
  You can also add a custom number of seconds at the start of the game prior to hitting the start button. It will not run unless a NUMBER greater than 0 is entered. Not only did I have to work the input functionally, but I also had to stylistically position it to not look jarring. The functionallity took about the same time as working the /submit POST as they used similar computation.
  
  - **Tech Achievement 4**:  
  The hardest techinical achievement (I think) was generating the table and getting it to format correctly. The first table is pre-defined in the server and every modification causes a new generation within the client-side javascript file. This was difficult because it took a lot of careful planning to understand where each data type had to go to appear in the correct column/row. 

    - **Tech Achievement 5**:  
  The table is now completely self-generating within the back-end and front-end. Before the table was premade, but now it is generated when the webpage is initialized such that other people's scores will be seen on load. This was done using the GET method and modifying the options within the fetch command.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
Custom made click button was added as a png to show where to click quickly and easily. Mostly static design to work with most resolution sizes (centered as well). Alerts were made to prevent most strange requests and also alert users of game-related happenings. It wasn't necessarily hard to implement, but it took careful planning to try and make sure the alerts didn't allow for game breaking bugs. 