Jacob Tutlis
https://a2-jtutlis.glitch.me/

## Movie Watch List

For this project I created an application where users can keep track of movies they want to watch. All the user has to do is submit a movie name and whether or not they have seen the movie. The server uses an IMDB api to get the IMDB URL of each movie. If the server can't find a URL it just links to the IMDB homepage.

After sending a POST request to the server with the movie name and if it was seen, the client then sends a GET request to update the table of all of the movies. Sometimes the client sends the get request before the server is done processing the URL of the most recent movie, so you may have to refresh the page after pressing submit to get the URL.

I was able to implement all of the required concepts. For CSS positioning I used grids to line up each of the elements in the middle of the screen and space them evenly.

## Technical Achievements

-   **Live Data Updates**: Once the client sends their new movie to the server, the page will be updated in place without having to be refreshed.
-   **IMDB API**: Used an IMDB api to get URLs of requested movies.

### Design/Evaluation Achievements

-   **Think Aloud**: Conducted a think aloud with Jordan Gold
    -   Task: Add a movie and view its IMDB page.
    -   The test subject thought the color scheme of the page looked weird
    -   The test subject confused why the table loaded before the page. This was surprising to me because I was so use to it there, but without knowing its purpose it doesn't look good on the page.
    -   I didn't make any changes based on their feedback.
