# Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js
Bryce Corbitt 

http://a2-brycecorbitt.glitch.me

## Glitch Drive
Glitch Drive is your one-stop destination for storing, viewing, and accessing files (As long as they aren't too big and you don't mind other people looking at them). Users may submit any file of their choosing (under 71MB) in a form, along with their name and a password. After uploading, the user is directed to the uploads page that contains a feed of the uploaded files. Each entry in the feed contains buttons to download and remove the given file, as well as a table that contains metadata on the file and form submission. Video, Image, and Audio files are embedded into the feed, so users can view the uploaded content without having to download it. In order to delete a file, a password must be entered that matches the password used in the file's initial form submission.

The navbar is pretty cool if I do say so myself. It has a cat who loves to jam, and a gauge that reflects the storage capacity of the Glitch container. Because uploaded files are written to the container itself (and not `/tmp`), files are persisted on the drive even after the container shuts down.

### HTML:
All HTML components are rendered using the Pug.js view engine (which is why there are no actual .html files in the source code).
- A single html form is used to submit files.
- Results page contains data on submitted files, as well as previews for Image, Video, and Audio files.
- All pages currently validate.
### CSS:
In addition to writing my own CSS rules, I used the bootstrap framework to make things look cleaner. See `/public/css/styles.css` for the rules I wrote.

- Element selectors are used multiple to properly format audio, video, and image embeds within the feed.
- ID selectors are used on the buttons for each of the file entries, as well as for content in the navbar.
- Class selectors are used frequently
- Both inline-flexboxes and grids were used in positioning
- The Helvetica Neue font-family was used in the application.

JavaScript:
- XMLHTTP requests are used in the front-end to submit deletion requests for files, as well as to fill status information on the gauge.
- Script is used to transform the UTC upload timestamps to the local time of the browser.

Node.js:
- Express framework was used along with the Pug.js view engine.
- Bcrypt library is used to hash/validate file passwords
- Multer library used for parsing and storing the uploaded files. I hadn't used it before, so it was pretty fun to learn.
- It was probably a bit overkill, but I used the Sequelize ORM to manage a SQLITE database that contains all the data on uploaded files.


## Technical Achievements
- **Use of Derived Fields**:
    Because the file sizes are stored by number of bytes, I created derived fields to format the sizes into human-readable formats (namely KB and MB). 
- **Making Usable File Storage Service**: I wanted to create something that I would actually find useful. While I definitely underestimated how much work it would be, I'm quite pleased with how it turned out.

    Unfortunately, Glitch containers max out at 200MB. Got me thinking though; It's likely against their TOS, but you could hypothetically set up a more modular solution and mount a multi-GB virtual filesystem using Glitch containers. 

### Design/Evaluation Achievements
- **Jamming Cat**: Added a cat to the navbar with a button to play/pause a song. Playing the song switches the static image of the cat to a gif of him that dances to the music. Pausing the music replaces the gif with the original image, indicating that he needs music to jam. 
- **Use of the Bootstrap Framework**: Bootstrap 3 was used to create a clean UI for the application.
