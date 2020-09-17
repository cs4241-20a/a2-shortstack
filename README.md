Margaret Earnest
https://a2-margaretearnest.glitch.me/

## Coronavirus Symptom Tracker 2.0
This site is an extension of WPI's Covid19 symptom tracker that takes into account pre-existing conditions when analyzing symptoms. It uses a CSS grid to position elements on the page and the font PT Sans as the font for all text. Users should create a user with a username, password, and health information then update that user's status daily by inputting their symptoms. The user's Covid19 status is a derived data field, since it is based on symptom inputs.

## Technical Achievements
- **Single Page App**: The app operates in a single page, with a "Current Users" table at the bottom of the page displaying all users created so far. Users can see updated Covid19 statuses here.
- **Add, Modify, and Delete Data**: Users can add data to the database by creating a new user, modify data in the database by submitting a Covid19 symptom check, and delete data in the database by clearing it.

### Design/Evaluation Achievements
- **Testing with a Student**:
	1. The student's last name is Clark.
	2. The user had trouble with understanding the positioning of labels on the new user text boxes, did not like that the symptom areas were collapsible, and had trouble telling when the form was submitted.
	3. I didn't expect the issue with the symptom button not obviously showing that the form was submitted.
	4. Based on this feedback I would space out the labels for text boxes that are stacked on top of each other and make an alert showing that the form has been submitted.
- **Testing with another Student**:
	1. The student's last name is Deratzou.
	2. The user was surprised that collapsables made the mouse change to a hover symbol but not buttons, had a little confusion finding the update section, and had a misalignment of text boxes that didn't appear on my end.
	3. The part about the hovering mouse symbol surprised me, I never noticed that one clickable element changed the mouse's shape and the other didn't.
	4. Based on this feedback I would make buttons show a hovering mouse on hover and fix the CSS so that all text boxes are in alignment regardless of screen size.