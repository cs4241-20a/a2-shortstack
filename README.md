Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Jordan Stoessel

This assignment aims to introduce you to the concepts and practice involved in creating a prototype (i.e. not deployment ready) two-tiered web application. The baseline aims of this assignment involve creating an application that demonstrates the use of several specific pieces of HTML, CSS, JavaScript, and Node.js functionality.

Baseline Requirements
---

HTML:
- All pages should [validate](https://validator.w3.org)



3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.

7. Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname

---

## Speed Clicker
This is my project game for assignment 2. The game is a challenge to see how fast you can click under a self-defined amount of time. The main aspect is determining the clicks per second where the top winner will be placed as #1. The main challenge is to try and beat the incredible "Mr. Insano". 
Note: "Mr. Insano"'s stats are based on "Dylan Allred"'s record on "Recordsetter". 

The CSS positioning technique that was used was justifying content to the center such that everything is easier to see. 

Instructions: The first step is to define the amount of seconds you would like to be able to click. Next, click the start button. A red image will appear that reads "Click Here". This image will remain for the self-set time. Every click that is done is equivalent to 1 point. Try to reach a high score! After the self-defined time limit is reached, you may enter your name to be placed onto the leaderboard. Try your best to defeat the incredible "Mr. Insano". 

## Technical Achievements
- **Tech Achievement 1**: 
The webpage is a single-page app which needs no reloading to showcase updates from the server. When a user players, stores, or deletes on the webpage, they will not be taken to a different page. The webpage also is able to add AND delete information. Adding can be done after playing and reaching a score greater than 0. Deleting can be done by typing in the exact name (capital sensitive) of the player that is to be deleted from the leaderboard. The leaderboard is also sorted by clicks per second in case users were registered under differing playtimes (seconds). You can also add a custom number of seconds at the start of the game prior to hitting the start button. It will not run unless a NUMBER greater than 0 is entered. Not only did I have to work the input functionally, but I also had to stylistically position it to not look jarring. The functionallity took about the same time as working the /submit POST as they used similar computation. The hardest techinical achievement (I think) was generating the table and getting it to format correctly. The first table is pre-defined in the server and every modification causes a new generation within the client-side javascript file. This was difficult because it took a lot of careful planning to understand where each data type had to go to appear in the correct column/row. 

### Design/Evaluation Achievements
- **Design Achievement 1**: 
Custom made click button was added as a png to show where to click quickly and easily. Mostly static design to work with most resolution sizes (centered as well). Alerts were made to prevent most strange requests and also alert users of game-related happenings. 

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also find). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 