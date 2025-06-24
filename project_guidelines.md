# AI Travel Itinerary Planner

**Assignment Overview**

Build an AI-powered itinerary builder for vacations that lets users plan day-by-day trip schedules through an interactive chat interface. Users enter travel dates, destination, and preferences; the system—using its built-in AI knowledge—generates a complete itinerary. Users can then refine the plan by sending follow-up prompts, and the AI updates the schedule dynamically. Authentication lets users save, revisit, and continue refining past itineraries. Mobile responsiveness is a bonus feature.

## Restrictions and Rules

- **Do NOT use AI to code!** The goal is to test your own ability to build an app for a client as a freelancer. You can use AI for debugging and brainstorming but do not using coding.

---

## Functional Requirements

1. **User Authentication & Profile Management**
    - Users must register and log in before creating or viewing itineraries.
    - You may use tools like Supabase Auth or Clerk to manage authentication, or implement your own sign-up/login flows.
    - Once logged in, users can:
        - Create a new itinerary via an initial chat prompt.
        - View a list of saved itineraries.
        - Open any saved itinerary to resume the chat session.
        - Rename, archive, or delete itineraries.
2. **Input Form**
    - When creating a new itinerary, the user should be presented with inputs for the start date and end date of trip. These inputs are required. Example: July 1st 2025 to July 15th 2025.
    - There should be an additional input field (text area) that allows the user type in a description of the trip. For example, a user might type in: “A relaxing trip to Spain with my wife”.
3. **Interactive Chat-Style Interface**
    - Display every user message (e.g., “Trip from July 1–7 to Lisbon, focusing on food”) and AI reply in a chat layout with conversational bubbles and timestamps.
    - Allow free-text follow-ups such as:
        - “Can you add a wine tour on Day 3?”
        - “Swap the museum visit on Day 5 for a beach day.”
    - Each follow-up passes the full chat history to the AI so it returns an updated, context-aware itinerary.
4. **Itinerary Generation & Refinement**
    - On the first submission of dates, destination, and preferences, call the chosen AI service (e.g., OpenAI) to produce a day-by-day itinerary: activity names, brief descriptions, and recommended times.
    - Store the AI’s original itinerary and every subsequent edit under the same itinerary record to preserve conversation history.
    - Display each day’s schedule clearly—e.g., headings like “Day 1 – July 1” followed by activities.
5. **Itinerary Management**
    - **List View**: Show all of a user’s saved itineraries, each with:
        - Title (or destination)
        - Creation or last-edited date
        - Quick actions: View/Continue Chat, Rename, Delete
    - **Detail View**: Display the full chat history along with any sourced images or booking/hotel links. Provide an input box so users can keep refining.
6. **Automatic Image Sourcing (Bonus)**
    - Optionally fetch representative images for each recommended activity by querying a public image API (e.g., Unsplash, Pexels) using the activity’s name or keywords.
    - If implemented, display sourced images inline under the associated activity.
7. **Tours, Booking & Hotel Links (Bonus)**
    - Optionally append links to relevant guided tours or ticket-purchase sites (e.g., Viator, GetYourGuide) for each itinerary activity.
    - You may also include suggested hotel booking links (e.g., Booking.com, Airbnb) for each location or city in the itinerary.
8. **Developer’s Own Feature (Bonus)**
    
    Choose one feature not listed above, implement it, and explain why that feature enhances the user experience or addresses a specific need. This is optional but will showcase creativity and add extra value to the application.
    

---

## Technical Requirements

1. **Tech Stack**
    - The frontend and backend can be built as a single repository using a full-stack framework (e.g., Next.js, Remix) **or** split into separate frontend and backend services/repositories (e.g., React or Vue frontend + Node.js/Express or Flask backend).
    - **Database**: Any relational or document store (PostgreSQL, MySQL, MongoDB, etc.) to store the itinerary and user info.
    - **Authentication**: You may integrate with a provider such as Supabase Auth or Clerk, or implement your own authentication logic (hashing, sessions, JWTs, etc.).
2. **Frontend**
    - **Primary Use Case**: Desktop-first design. Mobile responsiveness is a bonus feature.
    - **Chat Interface**:
        - User messages appear on one side; AI replies on the other. Use distinct bubble styles and timestamps.
        - Initial form or modal collects trip dates, destination, and preferences; subsequent messages come through a persistent input at the bottom of the chat window.
    - **Itinerary Display**:
        - Within each AI response, clearly group day-by-day activities under headings like “Day 2 – July 2.”
        - If images or booking/hotel links are available, render them beneath the associated activity.
    - **Itinerary List Page**:
        - Display all saved itineraries in a grid or list, showing title, dates, thumbnail, and quick actions.
3. **Backend (Server-Side)**
    - **AI Integration**:
        - Call the AI service (e.g., OpenAI) from server-side functions or API routes. Include the full chat history (roles and contents) so the model generates context-aware updates.
    - **Session & Authorization**:
        - Only authenticated users may create, read, update, or delete itineraries.
        - Itineraries are scoped to a specific user so a user cannot see another person’s itineraries.
    - **Database**
        - Itinerary data should be stored in the database
4. **Deployment**
    - Host the completed website online on a platform like Vercel, Netlify, Fly.io, or any equivalent service.

## Examples

These are some examples of what the service could do.

[Example 1](https://www.notion.so/Example-1-207d9b0e8a5f80749e9dcfc4fcddd0bd?pvs=21)

# Example 1

Note this example does NOT includes optional features such as the hotel link, tour link, and images.

> Form Inputs (user fills out before chat appears):
> 
> - **Start Date:** July 1, 2025
> - **End Date:** July 15, 2025
> - **Trip Description:** “A relaxing trip to Spain with my wife, focusing on beaches, paella, and a bit of sightseeing in Barcelona.”

> AI Output (day-by-day itinerary):
> 
> - **Day 1 (July 1st): Barcelona Arrival & Gothic Quarter Stroll**
>     - Morning: Arrive in Barcelona, check in at a beachfront hotel in Barceloneta.
>     - Afternoon: Light stroll through the Gothic Quarter, tapas dinner at a local tapas bar.
>     - Evening: Sunset walk along Barceloneta Beach.
> - **Day 2 (July 2nd): Gaudí’s Park Güell & Beach Time**
>     - Morning: Visit Park Güell (prebook skip-the-line tickets).
>     - Afternoon: Lunch of paella at a seaside restaurant in Barceloneta.
>     - Late Afternoon: Relax on the beach—sunbathing and swimming.
>     - Evening: Dinner at a waterfront paella restaurant.
> - **Day 3 (July 3rd): Sagrada Família & Montjuïc Sunset**
>     - Morning: Guided tour of Sagrada Família basilica.
>     - Afternoon: Free time—optional stroll down La Rambla.
>     - Late Afternoon: Cable car up Montjuïc hill; watch sunset over the city.
>     - Evening: Tapas and sangria at Montjuïc’s rooftop bar.
> 
> *(…continues through Day 15, including a 3-day stay in Costa Brava for beach relaxation and a 2-day detour to Valencia for paella classes…)*


[Example 2](https://www.notion.so/Example-2-207d9b0e8a5f80dfbab3f6056f67fbb6?pvs=21)

# Example 2

Note this example includes optional features such as the hotel link, tour link, and images.

> Form Inputs (user fills out before chat appears):
> 
> - **Start Date:** September 10, 2025
> - **End Date:** September 20, 2025
> - **Trip Description:** “Backpacking South Korea solo. Focus on street food in Seoul, temple stays, and a short hike in Seoraksan.”

> AI Output (day-by-day itinerary):
> 
> - **Day 1 (September 10th): Seoul Arrival & Myeongdong Street Food**
>     - Morning: Fly into Incheon, take AREX to Central Seoul, check into a guesthouse in Hongdae.
>     - Afternoon: Explore Myeongdong; sample tteokbokki, hotteok, and gaiyang (chicken skewers).
>     - Evening: Live music in Hongdae and dinner at a pojangmacha (street-cart snack stall).
>     - **Hotel Link:** [Reserve budget guesthouse in Hongdae]
>     - **Image:** Photo of Myeongdong stalls at night.
> - **Day 2 (September 11th): Gyeongbokgung & Bukchon Hanok Village**
>     - Morning: Tour Gyeongbokgung Palace (rent a hanbok for photos).
>     - Afternoon: Walk through Bukchon Hanok Village, try traditional tea at a teahouse.
>     - Evening: Korean BBQ dinner in Insadong.
>     - **Tour Link:** [Guided Gyeongbokgung and hanbok experience]
> - **Day 3 (September 12th): DMZ Excursion & Gwangjang Market**
>     - Full Day: Day trip to the DMZ (booked in advance).
>     - Evening: Return to Seoul, explore Gwangjang Market for bindaetteok (mung bean pancake) and mayak kimbap.
> - **Day 4 (September 13th): Temple Stay at Bulguksa (Gyeongju)**
>     - Morning: Take KTX train to Gyeongju; check into Bulguksa temple lodging.
>     - Afternoon: Participate in chanting session and temple tour.
>     - Evening: Vegetarian temple dinner.
> - **Day 5 (September 14th): Seoraksan Hike**
>     - Early Morning: Travel to Sokcho; start Seoraksan National Park day hike (Biseondae trail).
>     - Afternoon: Lunch of local seafood in Sokcho.
>     - Evening: Relax at Sokcho beach before returning to Seoul on an overnight bus.
> 
> *(…continues through Day 10, including Jeonju Hanok Village food tour and final evening in Itaewon for international cuisine…)*
