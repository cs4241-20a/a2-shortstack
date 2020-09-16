## Simple Habit Tracker
https://a2-adriannastaszewska.glitch.me

My project is a habit tracker. It's a tool that allows to track progress on a habit for a certain amount of weeks. 
When a grid is created it will be blank (all fields are grey) and the first cell in the grid represent today (highlighted with a grey border).
User can track their progress on their goal by clicking on a cell. Click on a grey cell will result in the cell turing green (action done today), 
click on a green cell will make the cell red with represents a failure to complete the action. A click on a red cell makes the cell yellow which is 
meant to represnts days on which an action didn't need to be completed (if a user wants to only do the action few times a week). Finally, 
a click on a yellow block will result the cell to come back to status quo (grey). 

## Base requirements 
- **Derived field**: Server create a best array of days as well as calculates what day of the week the grid must start on based on the start date. 
- **Flex**: I used flex to position different "habit boxes"
- **Creating elements**: User can create new habits by filling out 2 text fields and pressing a button. 
- **CSS Styling**: I applied styling to various elements of my application, like the buttons and the tables. 

## Technical Achievements
- **Single-page app**: Application updates on any changes done by the user, there is no need for the user to refresh the page or . 
- **Deleting elements**: User can delete any existing habit 
- **Modifying elements**: User can change the fields in grid of the habit tracker, different states are represented by different colors. 

### Design/Evaluation Achievements
- **Testing the interface**: I did the evaluation with Ivan Eroshenko. Overall the experience was good. He didn't at first realise that he can go beyond just making the fields green. He said that it would be good to know what options are there from the start. For me the meaning on the colors is clear but for him it wasn't. Additionally, he suggested that the field to enter a habit and the number of weeks could clear after the habit was submitted. Based on his feedback I would create a legend to make it clear that there are 4 different color options and what is the meaning of each color.  
