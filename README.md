## Golf Club Tracker
For assignment 2, I created a single-page app that allows user to keep track of the golf clubs in their bag and ranks their clubs in order of distance (calculated server-side). The server also estimates the user's ball speed and swing speed based on the distance field that the user provides. The server uses the distances of the clubs to order the array such that clubs are displayed from the top down in order of distance.

I used a CSS grid layout which contains a table elements that can be dynamically updated as the user submits more golf clubs. I used the Grandstander font family from the Google Fonts API. All CSS styling is done in the style.css file and takes advantage of element selectors, ID selectors, and class selectors.

To use my golf club tracker, please visit http://a2-mmtolbert.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Created a single-page app that both provides a form for user to submit data and always shows the current state of the server-side data. When a user submits data the server responds by sending them back an updated version of the golfbag array (which includes server-side calculated values of ball speed and swing speed!), which the client uses to update its display accordingly.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
1. Conill
2. No problems reported
3. "What is distance?", "You can use placeholder instead of value in the input fields"
4. Change "distance" to "club carry distance" in header for clarity