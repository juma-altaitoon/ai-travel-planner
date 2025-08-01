# AI Travel Planner – Frontend

This is the frontend for the AI Travel Planner web application. It provides a modern, responsive user interface for planning travel itineraries powered by AI, user authentication, and interactive features.

## Features

- Responsive UI with Material UI and MUI Lab components
- User authentication (login, signup, password reset)
- AI-powered itinerary generation and display
- Dynamic forms with validation
- Timeline and card-based itinerary visualization
- Country and city selection with autocomplete
- Social media integration
- Theming (light/dark mode)
- Accessible and mobile-friendly design

## Tech Stack

- React (Vite)
- Material UI (MUI)
- React Router
- Axios for API requests
- Day.js for date handling

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-travel-planner.git
   cd ai-travel-planner/frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `frontend` folder (optional, for API base URL):
   ```
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

```sh
npm run dev
# or
yarn dev
```

The app will run on `http://localhost:5173` by default (Vite).

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── api/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── hero_section.mp4
├── .env
└── README.md
```

### Environment Variables

- `VITE_API_URL`: Backend API base URL

### Configuration

- API requests use the base URL from `.env` or proxy (see `api/axios.js`).
- Static assets (images, videos) go in the `public` folder.

### Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

### Customization

- Update theme and colors in `src/theme.js` or directly in MUI components.
- Add or modify pages in `src/pages/`.
- Add new components in `src/components/`.

### Accessibility & Best Practices

- All forms have validation and accessible labels.
- Responsive layout for mobile and desktop.
- Uses semantic HTML and ARIA attributes where needed.

### License

MIT

---

**For backend setup, see [`backend/README.md`](../backend/README.md).**