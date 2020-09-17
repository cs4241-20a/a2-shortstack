Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

http://a2-lindbergsimpson.glitch.me/

## Lindberg's Package Delivery Service
This project is a page that would allow clients to send packages through a courier. To use this project, input the description of the package, the weight of the package in pounds and the deadline (in number of days) for the package to reach the destination. The application then calculates and displays the cost of this shipment based on the weight of the package and the deadline. I used CSS grid for the positioning technique to allow the form to be on one side of the page, and the table/database to be on the other side.

## Technical Achievements
- **Tech Achievement 1**: This single-page app utilizes a combination of forms and tables so that a user can submit data, and the app will display both the data and the result of the derived field. The three fields used here are the description, weight and deadline, while the derived field is the cost of shipment.

### Design/Evaluation Achievements
- **Student Interview 1**: <br />
Student Last Name: Owuor <br />
Problems: The number inputs allow me to enter negative numbers.<br />
Surprising Comments: I could see this being a real application or business if you developed it further.<br />
Changes to be made based on feedback: Implement a checker that displays a popup/error message when a user attempts to enter negative numbers in the number fields.<br /> <br />
- **Student Interview 2**: <br />
Student Last Name: Patel <br />
Problems: When nothing is input in the description field, the app still creates a new row without a package description. Also, the page itself is very empty. <br />
Surprising Comments: The color scheme does not look very good. <br />
Changes to be made based on feedback: Cater to this edge case by implementing a check to ensure all fields are filled before the submit funciton processes the data. Also, a popup could be displayed telling the user to ensure the fields are filled before clicking the submit button and a couple pictures could be added to make the page more appealing.
