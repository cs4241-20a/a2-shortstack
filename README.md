## AccuMouse - The Mouse Accuracy Game
# By Truman Larson
https://a2-trumanlarson.glitch.me/
AccuMouse is a mouse accuracy game that seeks to improve the user's clicking accuracy. A leaderboard is provided so the best of the best can rise to the top. To play, all you need to do is press the start button and start clicking as many circles as you can! Note: sometimes it may feel like the circles are broken and don't actually get click, but I assure you they are not broken! 

For css positioning of the elements I used a flexbox column to center everything in the middle. 

## Technical Achievements
- **Created a single-page app**: By sending the data on the back of a response to a GET request, I was able to create a table that provides the current state of the server-side data when the user submits data. This allows the user to get instant feedback on their current rank in the leaderboard, and to see their calculated score per second statistic.
- **Created an interactive, animated, JavaScript game**: I created a game that was able to keep track of many different entities within an environment with simple moving and bouncing physics. This application is able to move each entity with different speeds, increasing the speed each time it hits a wall. The application additionally tracks how many times an entity has hit a wall, scaling the speed and reducing point value each time, and it removes entities which have hit the wall 3 times. The interactive element is the core of the purpose for this game: the clicking. Clicking on an element will add the score value of that element to the total user score and delete the element.  

### Design/Evaluation Achievements
- **Think-aloud**: 
    1. Provide the last name of each student you conduct the evaluation with.
        - Birchfield
    2. What problems did the user have with your design?
        - At the time there was no start button and no colors and the user said that there should be a start button to make the game easier to play and colors. 
    3. What comments did they make that surprised you?
        - when testing i didnt realize how important a start button would be for normal use because it lets the user take in the instruction before the game starts to move
    4. What would you change about the interface based on their feedback?
        - I did change everything mentioned by the user (since they were mostly simple fixes) but if I were to take it further based off the feedback I would add a countdown system to the start button so that there is even more time for the user to prep for the game