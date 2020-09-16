# Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

## Online Grocery List

I created an interactive online grocery list using a two tier web stack composed of a website with javascript and a server running node.js. The user will input a quantity and item and then submit it to the server. The server will query an api to get the calories of the item (I question the full accuracy of these caloric numbers but for now am just trusting the api) and then return the full item back to the client while storing a copy of the item in the server. The user can then check items off when they have been purchased and delete all purchased items at once. There is no explicit results functionality as this is a single-page app that always updates the shown data to be in sync with the server. For CSS positioning I used a flexbox set to column direction to make my website nicely centered and spaced.  

**NOTE:** In order to avoid paying money I am using a slightly worse api than others on the market and am using the demo key which should not have any major problems but there is a chance that frequent use of the website could cause it to exceed its query limit. This project also uses node-fetch to run properly.  

**Glitch Link:** https://a2-jgold189.glitch.me/

### Technical Achievements

- **Tech Achievement 1**: Created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. When the user submits data, the server responds by sending back the updated data (including the derived field calculated on the server) and the client then updates its data display. When data is deleted from the client, this info is sent to the server as well so the server also deletes this data.
- **Tech Achievement 2**: Queried an outside api for information in the application.

### Design/Evaluation Achievements

- **Design Achievement 1**: Shown in `style.css`, all elements of the website are styled. This styling is intended to create a simple, nondistracting, and easy to use website experience.