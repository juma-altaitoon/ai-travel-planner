# AI Travel Planner – Backend

This backend powers the AI Travel Planner web application, providing authentication, itinerary generation, user management, and integration with AI and third-party APIs.

## Features

- User authentication (JWT, sessions)
- Secure password reset and signup flows
- AI-powered itinerary generation
- RESTful API endpoints for itineraries, users, and preferences
- Integration with external APIs (e.g., maps, weather, places)
- Input validation and error handling
- Environment-based configuration

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- dotenv for environment variables
- bcrypt for password hashing
- CORS support
- (Optional) OpenAI API for itinerary generation

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-travel-planner.git
   cd ai-travel-planner/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `backend` folder:
   ```
   PORT=5000
   MONGODB_URI=
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key   # for AI features
   ```

### Running the Server

```sh
npm start
# or
yarn start
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/auth/signup`          | Register a new user                |
| POST   | `/auth/login`           | Login and receive JWT              |
| POST   | `/auth/forgot-password` | Request password reset             |
| POST   | `/auth/reset/:token`    | Reset password with token          |
| GET    | `/itinerary`            | Get user itineraries               |
| POST   | `/itinerary/generate`   | Generate new itinerary (AI)        |
| ...    | ...                     | ...                                |

See the source code for full endpoint documentation.

### Environment Variables

- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT signing
- `OPENAI_API_KEY`: API key for AI integration (optional)

### Security Best Practices

- Never commit your `.env` file or secrets to version control.
- Always validate and sanitize user input.
- Use HTTPS in production.
- Store passwords securely (bcrypt).

### Testing

- Use Postman or similar tools to test API endpoints.
- Automated tests can be added with Jest or Mocha.

### Folder Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── app.js
├── server.js
└── .env
```

### Contributing

Pull requests and issues are welcome! Please follow best practices and write clear commit messages.

### License

MIT

---

**For frontend setup, see [`frontend/README.md`](../frontend/README.md)