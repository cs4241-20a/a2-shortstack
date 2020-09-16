Readme
---
## Glitch URL: https://glitch.com/~a2-sammoran

## Exotic Car Auctions
My project is a mock auction website for exotic cars. The user can list a car for sale by selecting from a list of makes, entering model, year, mileage, and MPG information. The server then calculates a "fair" (read: mostly-arbitrary)
price for the listing and displays it as part of the results. The CSS positioning technique I used was flexbox. My `style.css` contains minimal styling, as I used Bootstrap CSS for the majority of this project.

One thing to note: I did validate my HTML, and it came up with a few errors relating to some of the Vue directives on HTML tags (v-if, v-for, v-bind). These attributes are replaced
with valid HTML by Vue after the page is loaded. I hope that's alright; I asked about it in the Microsoft Teams channel, but didn't hear back before I had to submit.

## Technical Achievements
- **Created Single Page App with Vue.js**: I used Vue.js to manage the state for my application
in order to display the results alongside the form to add a new car for auction. I've used Vue
before, but I haven't really integrated it with a backend as I did here.
- **Displayed Images Based on Car Make**: In order to make my site more visually interesting, I
implemented a method of displaying thumbnail images for each vehicle listing depending on the make
of the car (for instance, cars with "Bugatti" as their make show a distinct thumbnail image of a
Bugatti). This involved modifying `server.improved.js` to serve each image, and also involved
adding a method to the cards displayed in `index.html` to request the proper image from the server
based on each individual car's `make` attribute.
- **Added Input Validation with Error/Success Messages**: I added some rudimentary input sanitization
on the client side to help ensure the data reaching the server makes sense. Clicking "Submit" will
only send the form data to the server if the "Model" input is not empty and if the "Mileage" input
is a number greater than 0. 

### Design/Evaluation Achievements
**Tested Website with Classmates**:
- **Provide the last name of each student you conduct the evaluation with:** Castro


- **What problems did the user have with your design?** He completed the task of adding a vehicle to be
auctioned without difficulty and said that it was clear and straightforward. In terms of UI design, he
mentioned that the car listings would look better if they were spaced out more and rounded slightly more
to match the style of the input area at the top the screen.

- **What comments did they make that surprised you?** I wasn't really surprised by his feedback, I tried to
make my site as simple and straightforward to use as possible. I agree that the UI would look better with
the changes he suggested.

- **What would you change about the interface based on their feedback?** I would take the suggestion of rounding
the border of each individual vehicle listing and increasing spacing between them - I looked into making
this change, but as those components are styled with classes from Bootstrap CSS, it seems I would have to
make changes to Sass variables, which I'm not yet familiar with.

### Image Attribution
Buggatti image: https://commons.wikimedia.org/wiki/File:Red_Bugatti_Veyron_on_the_road_(7559997596).jpg
Lamborghini image: https://commons.wikimedia.org/wiki/File:Lamborghini_Aventador_Genf_2018.jpg
Ferrari image: https://commons.wikimedia.org/wiki/File:Ferrari_458_Italia_in_Sweden_2016.jpg
Koenigsegg image: https://commons.wikimedia.org/wiki/File:NY15.Koenigsegg_Agera_HH.jpg
McLaren image: https://commons.wikimedia.org/wiki/File:McLaren_P1.jpg