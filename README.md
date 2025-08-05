# Note-Taking App (MERN Stack)

A full-stack note-taking application built with MongoDB, Express, React, and Node.js. Features rate limiting, RESTful API, and a modern UI with TailwindCSS and DaisyUI.

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
  .env              # Environment variables

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

## Features

- **Backend**
  - RESTful API for notes (`GET`, `POST`, `PUT`, `DELETE`)
  - MongoDB for data storage ([`connectDB`](backend/src/config/db.js))
  - Rate limiting via Upstash Redis ([`rateLimiter`](backend/src/middleware/rateLimiter.js))
  - Express server ([`server.js`](backend/src/server.js))

- **Frontend**
  - React SPA with routing ([`App.jsx`](frontend/src/App.jsx))
  - Toast notifications
  - TailwindCSS and DaisyUI for styling

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance
- Upstash Redis credentials

### Backend Setup

1. Install dependencies:
    ```sh
    cd backend
    npm install
    ```
2. Create a `.env` file with:
    ```
    MONGO_URI=your_mongodb_uri
    PORT=3000
    NODE_ENV=development
    ```
    Upstash Redis credentials should be set as environment variables.

3. Start the server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Install dependencies:
    ```sh
    cd frontend
    npm install
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```
3. Visit [http://localhost:5173](http://localhost:5173)

## API Endpoints

- `GET /api/notes` - List all notes
- `GET /api/notes/:id` - Get note by ID
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## License

MIT
