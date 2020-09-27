---

## Flashcard Creator
link: https://a2-ntaurich.glitch.me/

This website is used to create a deck of flash cards to study. A card can be added to the deck by inputting a question, a answer, a difficulty, and an importance. The program will calculate the priority of the card based on the difficulty and importance. The card will then be inserted into the deck based on priority with the highest priority cards first. 

For the CSS positioning technique I used flexbox to align the cards.
## Technical Achievements
- **Tech Achievement 1**: all the cards stored on the server can be seen by paging through the deck of cards. The deck of cards updates each time the user submits a new card because the server sends back the newly updated list of cards. 
- **Tech Achievement 2**: clearing the deck: When the clear set button is pressed a post request is sent to the server. The server then clears the deck of cards and sends a response back. When it gets a response the site then updates to show that no cards have been created.  It was challenging because in the server I had to differentiate the difference between the post request for adding a card and for clearing the set. 

### Design/Evaluation Achievements
- **Design Achievement 1**: Testing User Interface
1. Last Name:Hunt
2. What problems did the user have with your design?
They didn't understand the purpose of the field 'importance' and didn't know if when they clicked submit if it had gone through so accidentally pressed submit twice.
3. What comments did they make that surprised you?
They found a bug where the first card created is repeated
4. What would you change about the interface based on their feedback?
I would add a description of what the purpose of the field importance is. I would also clear the form fields each time new data is submitted. This would indicate to the user that their card had been added to the deck.
