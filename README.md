## Gompei The Game: High Scores
This page is designed to show user's high scores from a made up game called "Gompei The Game". On page load a user can view a person's name, highscore, and date of the score, which can also be submitted and updated in real time using the submission form. The last field, Generated Name/Score is calculated on the server side, taking upto the first 4 characters in the username (transformed to upper case), with a dash, and then the actual user score.

## Technical Achievements
- **Single Page App**: Using node.js along with JavaScript on the front end, I achieved a webpage that always shows the results of the state of the server-side data. This was achieved by when the page loads, the window.onLoad function automatically calls for the response from the button submit. To make the data update after a user submitts a new score, in the response from the form submission contanis the JSON of all the data stored on the server including the submitted data. The combination of these allow for a single-page app that always shows the current state of the server-side data.6
- **Date Set to current day**: In response to Alexa's comments, I added a JavaScript function that automatically sets the date input to today's date.

### Design/Evaluation Achievements
- **Think Aloud Protocol**:
1. Freglette
2. She was confused that the date of the input field was an arbitrary day and not the current day.
3. She liked my concept and that it was simple to understand.
4. What I would change is the date input would use JavaScript to set the date to today. I did just that. 
