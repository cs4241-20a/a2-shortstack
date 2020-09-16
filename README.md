# Assignment2  Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js 

Author: Mingxi Liu
Glitchme Link: https://a2-liumxiris.glitch.me/

*Note: If Glitch has trouble opening the project, try running the following code inside the terminal coming with Glitch: *

```
$npm install mime
```
## How to serve:
```
$npm install
$node server.improved.js
```
and go to <http://localhost:3000/>
## How to validate:
Go to 

<https://validator.w3.org>

and enter the Glitchme Link
## Not-To-Use Password Generator
The project is inspired by some password don'ts. Many people would like to include their personal information known by everyone else in their passwords. So I create the project that allows users to enter their personal information and generates the password that they'd better not to use in the future : )
Some front-end techniques I use in the project:
- Flex Box
- CSS Grid
- Google Font
- Various CSS Selector 
 - Element Selector
 - ID Selector
 - Class Selector

## Technical Achievements
**Add, Modify, Delete Data**
- Users are able to submit the data and the website will always display the current state.
- Users are able to modify or delete the data
- An field (Paaword) is generated based on userss inputs. 

*Note: The project does not do any form validation, various bugs can occur if a form with any empty field gets submitted. So plezzzz do fill every field everytime submitting a form. *

*Note: Sometimes Glitch might have display lag. **Refreshing** the page  can solve the problem. *

*Note: Running the website locally in the Chrome on Mac can achieve the best result. (No display lag or CSS displaying  issue)

## Design/Evaluation Achievements
- **User Evaluation**:
 - Last name: Gong
 - Problem with the Design: The form for modifying pops up at the middle of the screen and it covers all the data in the table below. It's hard for user to doublecheck the data in the table and decide what changes to make. 
 - Comments: There might be some bugs when submitting a form leaving any field blank. Also, after making modification to the data, the information stays in the modification form and gets carried along.
 - What would I improve: Adding a form validation function and prevent user from submitting empty form and adjusting the position where popups will be. 