# Student Name: Quinn Rentz

## 1. Assigned Work:
Navbar and offcanvas for all pages, auth handling

## 2. Bootstrap Implementation
Using standard bootstrap classes and additional CSS for styling, as well as vanilla JS for the budget page pie chart functions. Building off the initial ugly build, which incorporated a simulated user sign-in, I was able to attach a supabase DB for handling user authentication. The Profile page is not currently connected to the supabase auth handling, neither does the data entered in the budget page, as fully building out the backend for this felt beyond the scope of this course.

## 3. Technical Challenges & Solutions
Ensuring the simulated budget charts populated correctly took a lot of work. My original intention was to store data in the supabase DB, and use those values to populate the charts, but configuring supabase for this was taking altogether too much time. I opted for a simulation using localStorage for this. The Profile page follows a similar story here, in that I was able to construct the layout, but configuring the handling of user preference changes on the back end was far too difficult.



## 4. AI/LLM Usage
I used some generative AI for templating the Javascript logic for handling the budget page pie chart animations, as I was unfamiliar with the javascript graphs library, and the documentation didn't provide much. Using these templates, I  I used VSCode's integrated AI for assisting in debugging.

## 5. Live Site Link
Contributions included across the following pages:
**Live URL (homepage):** https://vcu-257.github.io/iteration-2-build-with-style-group-12/
**Budget page** https://vcu-257.github.io/iteration-2-build-with-style-group-12/budget.html
**Profile page** https://vcu-257.github.io/iteration-2-build-with-style-group-12/profile.html