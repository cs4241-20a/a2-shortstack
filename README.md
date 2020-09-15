Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Abhijay Thammana 9/15/20
https://athammana-a2-athammana-1.glitch.me/

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
---

## Unscrmbl
So I kind of went overboard with this project, because I was bored this week, so sorry to whoever has to go through all the code. Basically the game is to just unscramble the word in large font and type the correct one in the input box below. With each wrong answer, nothing happens. Which each correct answer the score (stored in the server) increments and the word to scramble is pulled from the server. If the player is stuck they can use the Cheats button to get each letter starting from the first one. Or the 'answerkey()' function in the console. Once the player is satisfied with their score, they can type their name for the leaderboard in the top right  (or not) and then click end game. The score will then be stored in the server, and then the game updates the top 5 scores from the leaderboard and places them sorted. There is also a delete everything button to delete all entries. For the basic CSS positioning, there is a left block and a center block that both have the display flex property. Essentially almost everything inside of them are centered with justify-content and align-content. The flex wrap and flex direction column are also applied to each of the blocks.

## Technical Achievements
- **Tech Achievement 1**: For the Technical Achievement, the project manipulates the server data in multiple ways. There are a variety of post and get urls on the server that have different purposes in the application. First the Get urls: '/currentWord' returns the scrambled version of the current server word as a response; '/getCurrScore' returns the current score that is being kept track of by the server; '/getScores' returns all the current scores in a JSON array format; and lastly, '/deleteEverything' resets the current word, current score, and list of scores on the server to empty. The Post urls: '/guess' takes in a string as data from the request and compares it to the current word on the server and returns in plaintext true or false whether its correct or not and increments the current score if correct; '/newScore' takes in a json from the request data, adds the derived field of a rating, and adds it to the server's score list; '/hint' takes in a number from the request data field, and then responds with the corresponding character from the server's current word. All of these together complete the achievement of changing the database in the three different ways (Add, Modify, Delete).

### Design/Evaluation Achievements
- **Design Achievement 1**: 
