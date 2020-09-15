## Messenger
A simple program to communicate with others across the internet, with anonymous, expiring messages.

- Users can send messages using a dialog, along with setting the 'secrecy' level.
- Other users can then view messages and their expiration times on the homepage.
- The secrecy level affects when the server decides to expire the message.
- Messages can be editied with a dialog.
- Messages can also be prematurely deleted.

http://a2-darklordzach.glitch.me

## Technical Achievements
- **Live Single-Page Application**: Using AJAX/Fetch API, as soon as a message create/edit/remove API call is complete the webpage automatically updates the list of messages displayed. One challenge was preventing the race condition where the GET is performed before the POST finishes, this is fixed using promises.
- **All Three Operations**: It is possible to perform all 3 operations on the datastore, users can create messages, then edit their contents, and finally delete them. This was annoying to add because I had to add an 'id' field to each message to allow edit/delete.

### Design/Evaluation Achievements
*None*
