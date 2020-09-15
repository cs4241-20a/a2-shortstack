# Party Guest List - By Connor Burri
The point of this project was to create a web-based party guest list service. It is very important to know who is in your property at all times,
so I have given the ability to both add and delete guests. Another key feature of this project is the ability to process a birthday
and determine whether an individual is of age to be drinking at this event. Instead of doing the mental math to determine somebody's drinking 
eligibility, the server takes in the birthdate, determines the individuals eligibility and returns a boolean response to the client.
There is also the possibility for errors when entering the birthdate, so if the birthday is entered incorrectly, the user may override them
to be "drinking eligible" if they are upon further inspection, this is the modification part of the system. 

In terms of CSS used in this project, I used flexbox to center the form and the table in the center of the page. They were centered both horizontally
and vertically within their respective div's.

## Achievements

### Technical Achievements
- **Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data**: 
    * Both the form to enter the guest
    and the table showing all of the guests are housed within a single page. When a guest is submitted, the javascript injects the code into the html upon reception of the server response.
- **The ability to read, write and modify data**: 
    * I have given this application all 3 abilities to manipulate the stored data in the server. It reads in the information
    given to it by the form. it reads out the data from the server and displays it to the DOM. and we can modify existing data with the override functionality I alluded to in the 
    description.

### Design/Evaluation Achievements
- No design achievements were accomplished during the making of this project. It does however utilize bootstrap so that is nice