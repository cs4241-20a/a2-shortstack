Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Cursed Cat Wiki
Glitch Link: https://a2-christiantweed.glitch.me/

This project shows a series of cursed cat images and their corresponding title and description. In addition, a user can add their own cursed cat to the list, but it will appear below the default ones. I used both grid and flex to accomplish the best layout for the page as possible. 

## Technical Achievements
- **Tech Achievement 1**: In all JS files I used the 'use-strict' mode in order to ensure the stability of the application
- **Tech Achievement 2**: I allowed the user to submit a file to the server from the FE using the formData API
- **Tech Achievement 3**: In the server, I added a memoized cache for files, and set hard refreshes on the DB when it was updated to make sure the cache stayed fresh
- **Tech Achievement 4**: In the server, I used 'formidable' to pull the user submitted image from the request, and wrote it to the DB
- **Tech Achievement 5**: I implemented an entire card-stacking display for the series of cats
- **Tech Achievement 6**: In the server, I prevented a race condition with reading and writing the cats.json file, but let the fs save the image asynchronously

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed semantic convention and used no "divs" and instead tried to be as declarative as possible in the index.html file
- **Design Achievement 2**: I structured my CSS files as a heirarchy of classes and utilities so that way the base styles of certain elements were seperated from the presentation and layout of other elements
