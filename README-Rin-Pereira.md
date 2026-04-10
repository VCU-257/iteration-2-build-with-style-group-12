# Student Name: Rin Pereira

## 1. My Assigned Work
* I built the **Learning Page** (`learning-page.html`).
* I implemented the main grid layout for the learning topics and the responsive video/tips section.

## 2. Bootstrap Implementation
* **Components Used:** Navbar, Offcanvas Sidebar, Cards, Bootstrap Carousel, Ratio (Embed) helper, and Badges.
* **Consistency:** I followed Table 1 from GA 7 by using Cards for topics and the Ratio helper for video placeholders to ensure responsive scaling.

## 3. Technical Challenges & Solutions
* **The Challenge:** Risk #1 from our Table 4—putting cards inside a carousel and making them responsive.
* **The Solution:** I used the Bootstrap grid system *inside* the `.carousel-item`. By using classes like `d-none d-lg-block`, I ensured that desktop users see three cards per slide while mobile users see one, maintaining a clean layout across devices.

## 4. AI / LLM Usage
* **What I asked the AI:** "How do I make a Bootstrap carousel show 3 cards on desktop but only 1 on mobile?" and "How do I implement the Ratio helper for video placeholders?"
* **How it helped & What I learned:** The AI (Gemini) explained how to nest a `.row` inside a `.carousel-item`. I learned that I can use display utilities (`d-none`) to hide or show specific cards based on the breakpoint, which solved our group's primary technical risk.

## 5. Live Site Link
* **Live URL:** https://sonmeza.github.io/bootstrap-starter-427/learning-page.html