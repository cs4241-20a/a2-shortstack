## simcar

https://a2-rmanky.glitch.me/

**simcar** is a multiplayer strategy simulation racing game, though I would likely throw air qoutes over every single one of those words if I was saying that out loud.\
A *fancy* 3D model of a Formula 1 car is displayed front and center, then scrolling down leads to a form where users can simulate their own Monaco races.\
*Please give the model some time to load, it's only 4MB*

Realtime weather information is used to calculate lap times, so that information is provided to the user as well.

The 3D rendering is powered by ThreeJS, with a model from SketchFab that has been modified by me to be customizable and animated (here is the [original](https://skfb.ly/6TzIR)).

For styling I wanted to try Bootstrap but it seemed like a little much, so I opted for [Bulma](https://bulma.io/) instead. It's a single CSS file, but golly is it usefull.\
The only downside is that I had to write all the clientside Javascript myself, but that wasn't too painful after doing the ThreeJS code.

This does mean that the W3C validator throws a **warning** about not having a header for a `<section>`. I would have thrown in a header with `visibility: hidden` to get around it, but that seems like cheating.\
Lastly, the website works pretty great on mobile (except for ThreeJS which renders lighting *slightly* differently for some reason).

Realtime weather at Monaco is provided to the client and the server by [OpenWeatherMap](https://openweathermap.org/).\
My API key is only the free version, so please don't share this site with 10 of your friends :)

When a user enters the required information (the input highlights in red if it's not filled), they get their final laptime and their position.

## Technical Achievements
- **Tech Achievement 1**: ThreeJS to render a 3D visualization of the user's car, with a color-changing paint to match their selection.\
I've done a few tricks to make it as realistic as possible:
    - Lighting comes soley from an HDRI
    - The car paint has a clearcoat to mimic real life paint
    - I pre-baked a shadow in Blender to place below the car (as ThreeJS shadows are *slow*)
    - `ACESFilmicToneMapping` is used to give a *filmic* look
- **Tech Achievement 2**: Upon submitting their simulation settings, the data is sent to the server and the real weather at Monaco is used to calculate a lap time.
- **Tech Achievement 3**: On the "Leaderboard" page, pre-entered results are provided to give the user some sense of good (and bad) lap times. 
They can (of course) also see their lap time and position both when submitting and when viewing the leaderboard.
- **Tech Achievement 4**: Each lap time is stored with an internal unique ID (I have set the ID of the "Invalidate Lap" button to that ID if you want to see it).
This ID is used to delete lap times from the table, then update the table with new positions.

### Design/Evaluation Achievements
- **Design Achievement 1**: Bulma to style the website in a modern style, with a large hero element and button that smoothly scrolls the user down to a seperate section where they can enter their simulation setup.

*Maybe next project, you'll be able to drive the car around*
