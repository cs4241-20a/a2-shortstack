# Matthew St. Louis - Assignment 2:  Short Stack
Basic Two-tier Web Application using HTML/CSS/JS and Node.js

App Name: __Tagteam Marathon__
Site: __[a2-mastouis.glitch.me](https://a2-mastouis.glitch.me/)__

1. [Matthew St. Louis - Assignment 2:  Short Stack](#matthew-st-louis---assignment-2-short-stack)
   1. [Core Assignment](#core-assignment)
      1. [App Description](#app-description)
      2. [Basic Requirements](#basic-requirements)
      3. [HTML](#html)
      4. [CSS](#css)
      5. [JavaScript](#javascript)
      6. [Node.js](#nodejs)
   2. [Acheivements](#acheivements)
      1. [Technical](#technical)
      2. [Design/UX](#designux)
         1. [Ann Jicha](#ann-jicha)
         2. [Gabe Aponte](#gabe-aponte)

## Core Assignment
### App Description
The app I built is called Tagteam Marathon. The app is meant for teams of runners to log their runs so they can track their progress as a team. This is especially useful for runners who want to engage with a team without physically running together, which could be helpful with current circumstances. The app has four sections: About, Completed Runs, New Run, and Edit Runs.

- The __About__ section explains a bit about the app so that users can complete tasks with less external prompting.
- The __Completed Runs__ section displays a table of the runs submitted to the system and a few statistics derived from the runs.
- The __New Run__ section allows a user to submit a new run.
- The __Edit Runs__ section allows a user to edit information about any submitted run.

### Basic Requirements
The following is a list of how my web app meets the assignment's basic requirements.
- __`Server`__:  The `[server.improved.js](./server.improved.js)` file contains the server information. This server serves all necessary files for this web app, and maintains a tabular data set with 5 fields (Runner, Location, Distance, Time, and Speed).
- __`Results`__: The Completed runs section shows all data as it is stored on the server.
- __`Form/Entry`__: The _New Run Form_ allows users to enter information to create a new run, and the _Edit Runs_ fields let users modify runs. Users may also delete runs using the buttons to the right of the _Edit Runs Table_.
- __`Server Logic`__: For each record, the server calculates the `speed` of the run based on teh run's `distance` and `time`. This calculation is done on line 80 of `[server.improved.js](./server.improved.js)`.

### HTML
- The _New Run_ section uses an __[HTML Form]__(https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms) and a combination of text and numeric inputs. The inputs all have appropriate placeholders.
- The _Completed Runs_ section uses a __table__ to display all data currently available on the server.
- The page was [validated](https://validator.w3.org).

### CSS
- Primary Visual Elements
  - I used the [Adobe Color Wheel](https://color.adobe.com) to pick out the palette for the site. Every color seen is either a shade of grey or one of the recommended shades of purple from the primary shade I used.
  - I put a thin black border on the tables to make the rows more distinct.
  - I restyled the buttons to have rounded edges and a thin black border.
  - I restyled the inputs to be purple with white text and grey placeholder text.
- CSS Selector Functionality
  - I used an __element selector__ to style all buttons on the page to have rounded edges, a thin black border, and to have a dark purple fill with light purple text.
  - I used an __ID Selector__ to make the `Runs Table` and the `Edit Runs Table` full-width
  - I used a __class selector__ to make all of the delete buttons on the `Edit Runs Table` take up the full width of the cell with a minimum width of 30px.
- CSS Positioning and Styling
  - I used a __CSS Grid__ to style the `New Run Form` into a grid of labels and boxes. I made the submit runs button at the bottom take up the full width of both columns and centered it.
  - I sourced all of the fonts I used from [Google Fonts](http://fonts.google.com/). I used Raleway for the headings and Lexend Deca for everything else.
- The CSS is defined in an [external stylesheet](./public/css/style.css) and should be reasonably readable for maintenance.

### JavaScript
- My JavaScript is in its own [scripts.js](./public/js/scripts.js) file.
- This file fetches data from the server and delivers post requests, as well as clearing and populating the tables to correctly show the server's data.
- One neat feature is that I manually have the `New Run Form` reset if the data is successfully submitted.

### Node.js
- __`Server`__:  The `[server.improved.js](./server.improved.js)` file contains the server information. This server serves all necessary files for this web app, and maintains a tabular data set with 5 fields (Runner, Location, Distance, Time, and Speed).

----

## Acheivements
### Technical
- The web app always shows the current state of the server-side data without reloading the page. 
  - The `loadData()` function in [scripts.js](.public/js/scripts.js) is responsible for making a GET request to the server for all stored data and populating the Completed Runs Table and the Edit Runs Table.
  - The `loadData()` function is called after any POST request receives a Success response.
- In the 1pm lecture on Monday, September 14th, Professor Roberts explained that implementing functionality for __adding__, __editing__, and __deleting__ data would constitute an achievement. This app accomplishes all three and has a separate POST request for each.
  - The New Run Form lets users add a new run, and this uses the `/addRun` POST request.
  - The Submit Edits Button edits the runs stored on the server with a POST request to `/editRuns`.
  - The Delete Run Buttons delete a run stored on the server with a POST request to `/deleteRun`.

### Design/UX
I presented my app to two students and interviewed them using the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain design feedback.

I asked each participant to complete the following set of tasks with no further instruction.

> 1. Create a new run with arbitrary data.
> 2. Submit the new run.
> 3. Edit some information in your new run.
> 4. Submit the edits.
> 5. Delete your new run.

#### Ann Jicha
1. What problems did the user have with your design?
   - The user found the "location" column ambiguous. She asked to themselves whether it was the start location, the end location, or the general area where the run takes place.
2. What comments did they make that surprised you?
   - The user found the button colors a bit confusing. She assumed that they were disabled because of how dark they were.
3. What would you change about the interface based on their feedback?
   - Given this feedback, I would add a small note under the New Run section indicating that the "location" field is the area where the run takes place.

#### Gabe Aponte
1. What problems did the user have with your design?
   - The user thought that the submit buttons were a bit awkwardly placed in relation to the fields they submit. He also thought it was a bit of a problem that the site accepts blank runs.
2. What comments did they make that surprised you?
   - The user wanted to see what happened when they entered unreasonably long strings into the fields, and they commented that the UI handled this in a "surprisingly bearable" way, which I took as positive.
3. What would you change about the interface based on their feedback?
   - Given this user's feedback, I would add some validation to the form so that the user cannot submit a new run with blank fields or submit edited runs with blank fields. I would also try harder to center the Submit Edits button or to right-align both submit buttons. (I tried the former and was unsuccessful.)
