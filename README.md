
- All pages should [validate](https://validator.w3.org)

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also find). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Golf Club Tracker
For assignment 2, I created a single-page app that allows user to keep track of the golf clubs in their bag and ranks their clubs in order of distance (calculated server-side). The server also estimates the user's ball speed and swing speed based on the distance field that the user provides. The server uses the distances of the clubs to order the array such that clubs are displayed from the top down in order of distance.

I used a CSS grid layout which contains a table elements that can be dynamically updated as the user submits more golf clubs. I used the Grandstander font family from the Google Fonts API. All CSS styling is done in the style.css file and takes advantage of element selectors, ID selectors, and class selectors.

To use my golf club tracker, please visit http://a2-mmtolbert.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Created a single-page app that both provides a form for user to submit data and always shows the current state of the server-side data. When a user submits data the server responds by sending them back an updated version of the golfbag array (which includes server-side calculated values of ball speed and swing speed!), which the client uses to update its display accordingly.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
