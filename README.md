# my Notes: Your Personal Note-Taking App

A sleek and intuitive note-taking application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Designed for effortless note management, it features a modern, clean user interface with **lime, white, and gray accents** for a delightful user experience. Enjoy a seamless and responsive experience across various devices.

## Live Demo

Experience the app live:

*   **Frontend:** [https://mla-note-taking-app.vercel.app](https://mla-note-taking-app.vercel.app)
*   **Backend API:** [https://mla-note-taking-app-backend-domain.vercel.app](https://mla-note-taking-app-backend-domain.vercel.app) (API root will show "Not Found" as expected)

## Screenshots

Here are some glimpses of the "my Notes" application in action:

### Home Page (No Notes)
![Home Page - No Notes](/Note%20App%201.jpg)

### Create Note Page
![Create Note Page](/Note%20App%202.jpg)

### Home Page (Notes Created)
![Home Page - Notes Created](/Note%20App%203.jpg)

## Features

The "my Notes" application leverages the power of the MERN stack to provide a robust and scalable solution for your note-taking needs.

### Backend
*   **RESTful API:** Comprehensive API for notes (GET, POST, PUT, DELETE), ensuring efficient data manipulation.
*   **MongoDB Integration:** Robust and flexible data storage using MongoDB, a NoSQL database.
*   **Rate Limiting:** Implemented with Upstash Redis to protect the API from abuse and ensure fair usage.
*   **Express.js Server:** A fast, unopinionated, minimalist web framework for Node.js, providing a powerful foundation for the API.

### Frontend
*   **Intuitive UI:** Built with React for a smooth Single Page Application (SPA) experience, offering dynamic and interactive user interfaces.
*   **Modern Styling:** Utilizes TailwindCSS for utility-first CSS and DaisyUI for beautiful, ready-to-use UI components, resulting in a clean, responsive, and visually appealing design.
*   **Toast Notifications:** Provides subtle and informative user feedback for various actions (e.g., note created, updated, deleted).
*   **Dynamic Backend Connection:** Configured to seamlessly connect to a deployed backend API using environment variables, ensuring flexibility across different deployment environments.

## Project Structure

```
backend/
  src/
    config/         # Database and rate limit config
    controllers/    # Express route handlers
    middleware/     # Custom middleware (rate limiter)
    models/         # Mongoose models
    routes/         # API route definitions
    server.js       # Express server entry point
  package.json
  .env              # Environment variables (local)

frontend/
  src/
    components/     # React components (Navbar, etc.)
    pages/          # React pages (Home, Create, Note Detail)
    App.jsx         # Main React app
    main.jsx        # React entry point
    index.css       # TailwindCSS and DaisyUI setup
  public/
    vite.svg
  index.html        # HTML entry point
  package.json
  vite.config.js    # Vite config
  README.md
```

## Getting Started

### Prerequisites

To run this project locally, you will need:

*   Node.js (LTS recommended)
*   A MongoDB instance (e.g., a free tier cluster from MongoDB Atlas)
*   Upstash Redis credentials (for rate limiting)

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories to manage your environment-specific variables.

#### `backend/.env` (for local development)

```
MONGO_URI=your_mongodb_uri
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
PORT=3000
NODE_ENV=development
```

#### `frontend/.env` (for local development)

```
VITE_BACKEND_BASE_URL=http://localhost:3000/api
```

**Note:**
- Replace placeholder values with your actual credentials.
- Never commit your actual credentials to public repositories.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
4.  Visit `http://localhost:5173` in your browser to see the application.

## Deployment

This project is designed for separate deployment of frontend and backend on platforms like Vercel, offering flexibility and scalability.

### Backend Deployment (Vercel)

1.  Create a new Vercel project and connect it to your GitHub repository.
2.  Set the **Root Directory** to `backend/`.
3.  Configure **Environment Variables** in Vercel:
    *   `MONGO_URI`
    *   `UPSTASH_REDIS_REST_URL`
    *   `UPSTASH_REDIS_REST_TOKEN`
    *   `FRONTEND_URL` (set to your deployed frontend URL, e.g., `https://mla-note-taking-app.vercel.app`)

### Frontend Deployment (Vercel)

1.  Create another new Vercel project and connect it to the **same GitHub repository**.
2.  Set the **Root Directory** to `frontend/`.
3.  Configure **Environment Variables** in Vercel:
    *   `VITE_BACKEND_BASE_URL` (set to your deployed backend URL, e.g., `https://mla-note-taking-app-backend-domain.vercel.app/api`)

## API Endpoints

The backend exposes the following RESTful API endpoints for note management:

-   `GET /api/notes` - Retrieve a list of all notes.
-   `GET /api/notes/:id` - Retrieve a single note by its unique ID.
-   `POST /api/notes` - Create a new note. (Requires JSON body with note data)
-   `PUT /api/notes/:id` - Update an existing note by its ID. (Requires JSON body with updated note data)
-   `DELETE /api/notes/:id` - Delete a note by its ID.

## License

This project is licensed under the MIT License.