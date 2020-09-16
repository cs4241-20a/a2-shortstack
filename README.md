---
## Madeline Perry - Webware 2020
https://a2-madelineperry.glitch.me/

## Grocery Manager
Grocery Manager is a web application that allows users to create a grocery list using the form input to the left of the screen. The app then sends this information to the server where the total price of the item is calculated. If the item is either listed as prepared food or other, a %6.25 sales tax is added to its total cost. The information is then sent back to the front end where it is added to the the list corresponding to its given department and displayed to the user.

I used flexbox styling to display the form and the list elements side by side and spaced around the webpage.

Something that I struggled with a lot and ended up not being able to implement was a button that would calculate the total price of everything on the list. Everything I tried ended up breaking the submit button for the form, even if I gave the two buttons different ids or classes. I kept all of my code for this in the files commented out so that I can go back to this project after I have some more javascript experience and try to fix it!

## Technical Achievements
- **Tech Achievement 1**: Grocery Manager always displays what is in the server by adding it to a list on the front end immediately after the form is submitted. I did this by creating a text element and appending the json elements to it. To add it to a specific list, I gave each list a class value and then made a switch statement in my javascript which checked for the value of 'department' in the current json object.

## Design Achievements
- **Design Achievement 1**: 
1. Tested by: Minh Anh Kieu (not in this class)
2. Problems: No problems with filling out the form, but was confused by the example input that was provided in the list. She didn't know why there were apples on her shopping list when she never put them in. She also mentioned that the graphic design of my page improved from a previous version of it I showed her.
3. Surprising comments: I was surprised that the first thing that she wanted to do was remove apples from the list instead of adding any input to the list. My goal was for the user to want to add items right away, maybe my list is more eye-catching than my form?
4. Changes: I would remove the example input from the list, I think that the app is self-explanatory enough that the user does not need example input both inside the forms and in the list itself. Also, I would work on implementing item removal.