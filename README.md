[http://a2-theunlocked.glitch.me/]()

## RAMChat
RAMChat is a Twitter-style chat application where all the data goes away when the server dies (because all the data is stored in RAM). It features an account registration and login system which use HTTPS for security and password-hashing to keep passwords out of the hands of the server. Users can also opt not to log in and to instead just browse existing chat, though they won't be able to send any messages in this mode.

Chat messages are vertically listed using a flexbox, and are ordered based on a server-generated "popularity" value, which is a function of the age of a message and how many replies it has with higher popularity messages being higher on the list.

Users may send messages using a text box at the top of the page, or reply to existing messages with a text box at the bottom of each message card. Existing messages may be edited or deleted by their author.

At the bottom of the page is a button to allow the user to view all of the raw data stored by the server. Since popularity values are generated on the fly, they are not included though you can see the rounded popularity value of each message on the top of its card. Password hashes for other users are also not sent by the server for security reasons.

## Technical Achievements
- **HTTPS Redirect, Registration, and Authorization**: Users are required to register on the site before sending messages. The passwords created by users are SHA-512 hashed using `crypto.subtle.digest`, and are then sent along with usernames using the `Authorization` header and the `Basic` authorization type. While hashing passwords is not strictly necessary due to an automatic HTTPS redirect from the frontend javascript, it is done so that if the server were to be compromized, it wouldn't give the attacker every user's password in plain text. All requests that involve sending, editing, or deleting messages require valid credentials to be send in the `Authorization` header and will fail if appropriate credentials are not provided.

- **JSX and TypeScript**: TypeScript is used to avoid bugs from type incompatibilities, which is particularly useful with the large number of promises that RAMChat uses and making sure that they're properly awaited as necessary. TypeScript is also used as a JSX transpiler, which instead of using React, uses a custom JSX factory. The site is almost entirely javascript-rendered with the help of the JSX syntax.

- **Full Data Update on Message Send**: Whenever a message (not a reply) is sent, the client also asks the server for all of the message data so it can refresh the messages in case any new messages came in, as well as update the popularity scores. This data update can also be triggered manually with the "Refresh Messages" button at the top of the page.

### Design/UX Achievements
- **Material Design**: The site uses Material Design as its design scheme, using the pre-made CSS and JS package at [https://material.io/develop/web]().

- **Responsive/Works on Mobile**: The site was designed to be responsive and works quite well on mobile devices. Modals have minimum widths and heights relative to screen size, and the various flexboxes used for layout will automatically have their elements wrap in sensible ways as the screen gets thinner.

- **Design Help From Other Students**: While no formal user testing was conducted, students and alumni on a WPI chat group were asked to provide feedback on the site's visual design, which resulted in some fairly significant visual changes. Examples are provided below:

The original login modal didn't look right. After a few iterations going back and forth, we got to iteration 2, a substantial improvement, which I later tweaked a bit to get the current version.
<figure>
    <img src="https://i.imgur.com/pQsktSK.png"><figcaption>Original Login Modal</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/5eKAD8V.png"><figcaption>Iteration 1 Login Modal</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/UsYPQdx.png"><figcaption>Iteration 2 Login Modal</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/xYRxKJZ.png"><figcaption>Current Login Modal</figcaption>
</figure>

Something looked wrong with the old chat messages, and someone pointed out that it may have been an issue with contrast with the background. The change is subtle but significant.
<figure>
    <img style="border: 1px solid black" width="100" src="https://i.imgur.com/Z3pH366.png"><figcaption>Original contrast between messages and the background</figcaption>
</figure>
<figure>
    <img style="border: 1px solid black" width="100" src="https://i.imgur.com/ATUHdDs.png"><figcaption>Current contrast between messages and the background</figcaption>
</figure>

This last one was actually farily divisive between the students, but I think the "save on right" crowd was correct.
<figure>
    <img src="https://i.imgur.com/g0d12GL.png"><figcaption>Save on the left (original)</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/BokG5jP.png"><figcaption>Save on the right (chosen)</figcaption>
</figure>