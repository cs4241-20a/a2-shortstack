Readme
---

## My Movie List
A simple movie list manager with a local database. The list maintains fields of movie title, watched date, and total score (calculated by four sub-scores: plot score, meaning score, sound score, and enjoyment score) and is ordered by the total score.

## Technical Achievements
- **Framework**: Uses Koa as the web framework
- **Render Middleware**: Renders HTML using swig template through middleware.
- **Manage Functions**: Supports adding and removing functionality. 
- **Adaptive Fields**: Undefined fields (total score and ID) are automatically computed; the list is always sorted.

### Design/Evaluation Achievements
- **Design Achievement 1**: Uses Bulma as the CSS framework, which bases on CSS flexbox layout.
- **Design Achievement 2**: A modal box for adding movie functionality and its user experience is optimized clicking the background to cancel adding.
