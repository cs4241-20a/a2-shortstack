Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

https://a2-xiaowei-chen.glitch.me/

https://glitch.com/@xchen0326

---

## Student Information Application
My application takes the information that users put in about their name, gender and which year they are in college(i.e Freshman, Sophomore, Junior & Senior).  
The CSS positioning technique that I used is flex box, as you can find in style.css. I also used Google font, which is Aclonica. I used several tags, including div, input, label and form. I also used external CSS to make styling for them with all of the class, id and element selectors.   
There are no specific requirements in using this application except that the user must input something in the name box, otherwise there will be an alert.  
If you find an error opening the application using glitch, it is probably because of mime and the glitch requires you to npm install mime in its terminal. But this is not usual to encounter.



## Technical Achievements
- **Tech Achievement 1**: 
The application I wrote is able to show the current state of data. Whenever the user input something eligibly and submit, there will be a new row displaying the new information that is just added. Also, the previous information are also kept on the page. If the user refreshes the page, the information that the user input before is still on the page.

### Design/Evaluation Achievements

- **Design Achievement 1**: 
I asked Gong to review the application. To use the application, I asked her to simply entering the web url, input the name, select gender and current year and click on submit.   
She face no difficulties using the app. The following is what she commented on:  
You should change the results displaying part to table rather than input box. Also, it helps if you could make the data still on the page even if the user refrehes the page  
What suprised me is that what she suggested about keeping data after refresh is indeed a convenient feature for people to use, but I did not think of this before.  
Based on Gong's comments, I already fix the bug that data disappears after refresh. Now the data can be kept even after refresh.
- **Design Achievement 1**: 
I asked Ying to review the application. To use the application, I asked her to simply entering the web url, input the name, select gender and current year and click on submit.   
She face no difficulties using the app. The following is what she commented on:  
You may make the input boxes wider to fill out the whole length such that it looks more beautiful.  
I am suprised by her comment that the application looks comfortable as the font size is big.  
I may change the box width to be wider.
