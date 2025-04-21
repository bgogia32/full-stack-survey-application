# Survey Application

A full-stack web application for conducting surveys, built with Next.js frontend and Express.js backend.

## Project Structure

```
├── client/             # Frontend Next.js application
│   ├── src/
│   │   ├── app/       # Next.js app directory
│   │   ├── component/ # React components
│   │   ├── store/     # Zustand state management
│   │   └── type/      # TypeScript type definitions
│   └── public/        # Static assets
└── server/            # Backend Express.js application
    ├── repository/    # Database operations
    └── index.js       # Main server file
```

## Tech Stack

### Frontend
- Next.js 15.3.0
- React 19
- TypeScript
- Tailwind CSS
- Zustand (State Management)

### Backend
- Express.js
- SQLite3
- Knex.js (Query Builder)

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run database migrations:
   ```bash
   npx knex migrate:latest (recommended) OR npm run migrate
   ```

4. (Optional, recommended) Seed the database:
   ```bash
   npx knex seed:run (recommended) OR npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on http://localhost:4000

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at http://localhost:3000

## Available Scripts

### Backend

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm run migrate`: Run database migrations
- `npm run rollback`: Rollback the last migration
- `npm run seed`: Seed the database with initial data

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint for code quality

## API Endpoints

- `GET /api/master-data`: Retrieve questions and their domains
- `POST /api/answer`: Submit survey answers
- `PUT /api/answer/:answer_id`: Update existing survey answers

## License

This project is private and confidential.
