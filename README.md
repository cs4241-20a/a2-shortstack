Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Abhijay Thammana 9/16/20
https://athammana-a2-athammana-1.glitch.me/

--------------------------------------------------------------------------------------------------------------------------

## Unscrmbl
So I kind of went overboard with this project, because I was bored this week, so sorry to whoever has to go through all the code. Basically the game is to just unscramble the word in large font and type the correct one in the input box below. With each wrong answer, nothing happens. Which each correct answer the score (stored in the server) increments and the word to scramble is pulled from the server. If the player is stuck they can use the Cheats button to get each letter starting from the first one. Or the 'answerkey()' function in the console. Once the player is satisfied with their score, they can type their name for the leaderboard in the top right  (or not) and then click end game. The score will then be stored in the server, and then the game updates the top 5 scores from the leaderboard and places them sorted. There is also a delete everything button to delete all entries. For the basic CSS positioning, there is a left block and a center block that both have the display flex property. Essentially almost everything inside of them are centered with justify-content and align-content. The flex wrap and flex direction column are also applied to each of the blocks.

## Technical Achievements
- **Tech Achievement 1**: For the Technical Achievement, the project manipulates the server data in multiple ways. There are a variety of post and get urls on the server that have different purposes in the application. First the Get urls: '/currentWord' returns the scrambled version of the current server word as a response; '/getCurrScore' returns the current score that is being kept track of by the server; '/getScores' returns all the current scores in a JSON array format; and lastly, '/deleteEverything' resets the current word, current score, and list of scores on the server to empty. The Post urls: '/guess' takes in a string as data from the request and compares it to the current word on the server and returns in plaintext true or false whether its correct or not and increments the current score if correct; '/newScore' takes in a json from the request data, adds the derived field of a rating, and adds it to the server's score list; '/hint' takes in a number from the request data field, and then responds with the corresponding character from the server's current word. All of these together complete the achievement of changing the database in the three different ways (Add, Modify, Delete).

### Design/Evaluation Achievements
- **Design Achievement 1**: 

1. Patel
2. Just didn't notice the leaderboard name right away since it was tucked in the corner, but other than everything was clear
3. The background could be distracting and said there was a decent amount of whitespace
4. Make the leaderboard side a bit bigger, and maybe move the background blobs to be smaller and more central

- **Design Achievement 2**:

1. Abouaf
2. The buttons should be under the text field because they have to do with the text while the delete everything does not, also delete everything should be a different color or pop out more
3. The button placement, because I didn't even consider putting anything else under the text field to keep it minimalistic but it makes so much more sense
4. Definitely move the cheat and end game button to the center while changing the color of the delete everything

