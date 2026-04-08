# Student Name: Artin Rahemi 

## 1. My Assigned Work
Created the guides, credit-simulator, and money-tips pages.
 
## 2. Bootstrap Implementation
I stuck pretty closely to the plan from Table 1 in GA7 for my assigned pages. On the guides page I used the ratio helper for a YouTube embed and cards for article previews. For the credit simulator I used a range input for the credit score slider and an input group for the loan amount, plus a button and a card to display the estimated rate. On the money tips page I used a carousel for the featured tip banner, cards for the tip articles, and badges to show categories like Saving, Banking, and Credit. All navigation across my pages uses the required offcanvas and navbar combination with default Bootstrap classes only.

## 3. Technical Challenges & Solutions
I had two hard to deal with parts. For the cards inside a carousel part, I successfully implemented it on the money tips page by placing a card div inside each carousel item, and the standard Bootstrap carousel controls work without any custom JavaScript. 

For the credit simulator part of mapping range and input group to an interest rate estimation, I kept the estimation simple for this, I had the range slider update a live label, and the estimate button read the credit score and loan amount, then applied a basic rate lookup with a small loan amount adjustment, and displayed the result in a card. The hardest additional challenge was making sure the offcanvas navigation worked consistently across all the pages, which I solved by manually copying the same offcanvas HTML structure into each file.

## 4. AI / LLM Usage
Yes, I used an AI tool to help write and debug parts of my code.

What I asked the AI: I asked for a generic HTML5 starter template with a navigation bar that works on both desktop and mobile. I also asked for help debugging why my carousel cards were not displaying properly and how to structure a credit simulator with a range slider and input group.

How it helped and what I learned: The AI gave me a clean base layout with a functional navbar, which I then customized by adding my own Bootstrap cards, buttons, forms, and content. When the carousel cards overlapped or failed to show, the AI explained that each card needed to be wrapped inside a carousel item div with the right active class on the first item. I also learned how to keep the range slider label updated without interfering with Bootstrap’s default behavior. I made sure to understand every line of code by testing it in the browser and changing values to see how they affected the layout before putting it into my final pages.

## 5. Live Site Link
* **Live URL:** guides.html: https://vcu-257.github.io/ugly-build-with-bootstrap-group-12/guides.html
                credit-simulator.html: https://vcu-257.github.io/ugly-build-with-bootstrap-group-12/credit-simulator.html
                money-tips.html: https://vcu-257.github.io/ugly-build-with-bootstrap-group-12/money-tips.html