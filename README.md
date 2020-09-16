Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Ann Jicha https://a1-ahjicha.glitch.me

This assignment aims to introduce you to the concepts and practice involved in creating a prototype (i.e. not deployment ready) two-tiered web application. The baseline aims of this assignment involve creating an application that demonstrates the use of several specific pieces of HTML, CSS, JavaScript, and Node.js functionality. 


## Ice Cream Ordering System
Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.
My website is intended to allow employees of an ice cream shop to tabulate customer orders. It allows them to create, alter, and delete orders as needed in the back end using 3 separate labeled forms. Orders are stored on the server for this project, but they are displayed in a table in the bottom of the page for employees to easily view them.

My CSS positioning technique is a CSS flexbox column, so all the elements on the page are displayed in order in a single column. 

## Technical Achievements
- **Tech Achievement 1: One Page App**:
My application allows users to provide input via 3 forms, submit data, and show the currents state of the data server-side through a table at the bottom of the page. This is accomplished by using the responses from my HTTP requests (which the current data in the back end) in order to re-form the table with the current data. 

- **Tech Achievement 2: Add, Alter, And Delete Data**:
To add data, users input information into the fields for the Create Order form. This data is parsed and sent to the server to be stored. The response is used to update the table. 
My application is able to alter and delete data in the orders table. To alter data, the user provides the order number of the order they want to change (a unique identifier), and the new data for the flavor and details fields of that order. To delete data, the user provides the order number of the order they wish to delete. Once one of these forms is submitted, the change is sent to the server, where the record is searched for and altered or removed. The response from the server is used to update the table. 

### Design/Evaluation Achievements
- **Evaluation Achievement 1**: 
I asked two students to evaluate my work.

Provide the last name of each student you conduct the evaluation with: St Louis

What problems did the user have with your design? 

The user was able to complete the task, but mentioned the centering felt off.

What comments did they make that surprised you?

The user did mention they were unsure about the numbers input and what it was for (at this point it was not clearly prompted)

What would you change about the interface based on their feedback?

I corrected the number prompting for my create order form. I would also learn more about how to effectively design a website with alignment
that is not only functional but also pleasing to look at. 


Provide the last name of each student you conduct the evaluation with: Hauptfeld

What problems did the user have with your design? 

The user was able to complete the task, but was initially confused about what to enter for some fields. 

What comments did they make that surprised you?

The user's confusion about the fields surprised me.

What would you change about the interface based on their feedback?

I would find ways to improve the prompting and have clear labels above input boxes as well as in them. 