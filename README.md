Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

## Your Web Application Title: Camera List Boi
This project allows users to list a description of a camera for sale in a manner similar to Craigslist (No purchasing directly through the website). The user is presented with three ajacent boxes: Add Listing, Delete Listing, Update Listing, with a 4th box present below: Current Listings. To add a listiing, the user must fill in the listed fields - this is true for any of actions other than displaying current listings. 

Code Layout:
- All webpage side JS is located in scripts.js and all serverside JS is located in server.improved.js. The generation of the dynamic server data table was done by creating a document element and dynamically sizing its rows and columns based on the data passed from the server.

- All CSS is located in style.css. For this project, a mixture of element selectors, ID selectors, class selectors were used, including experimentation with overriding other styles. Locations of the major elements were done using a CSS grid. The font 'IBM Plex Sans' was used for all text on the website.

## Technical Achievements
- **Tech Achievement 1**: Add/delete/modify/display methods for the server's data are all included with respective forms on the webpage. The add/delete/modify were done via variations of 'POST' commands with different bodies. One of the derived fields in the server were unique IDs, so this allowed for relatively simple deletion and modification of data by using the ID as a key. When a listing was deleted, the next submitted listing would automatically be assigned that previous ID to prevent gaps in the ID listing.

- **Technical Achievement2**: Single-page app implementation. After any data is added/deleted/modified on the server, the webpage will automatically display the current state of the server data on the webpage. This was accomplished by reusing the original code I wrote for collecting server data and dynamically forming a data table on the website as a function call in a .then() block of the respective add/delete/modify fetch() commands. An initial issue that was encountered was that the update command would not finish by the time that the data collection method was called, as fetch() is nonblocking. This was solved via a short delay prior to the data collection method being added.

### Design/Evaluation Achievements
- **Design Achievement 1**: Thinkalouds were not conducted for this project.
