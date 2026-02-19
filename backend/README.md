
# Team Task Tracker  
Full-Stack Task Management Application  

Built using:  
- React + TypeScript + Tailwind CSS  
- Node.js + Express  
- PostgreSQL  
- JWT Authentication  
- Multer (File Upload)  
- Jest (Unit Testing)  

---

## Project Overview

Team Task Tracker is a full-stack web application that allows authenticated users to manage tasks with file attachments (images or PDFs). Each user can create, view, update, and delete their own tasks securely.

The application implements authentication using JWT and ensures users can only access their own tasks.

---

## Architecture

Frontend (React + Vite)
        ↓
Backend (Node.js + Express)
        ↓
PostgreSQL Database

Authentication Flow:
- User registers → password hashed using bcrypt
- User logs in → JWT token generated
- Token stored in frontend
- Token sent in Authorization header for protected routes
- Backend middleware verifies token before accessing tasks

---

## Features

### Authentication
- User registration
- User login
- Password hashing (bcrypt)
- JWT-based authentication
- Protected routes (frontend + backend)

### Task Management
- Create task
- Read tasks
- Update task
- Delete task
- Task status (Pending / Completed)
- Due date support
- User-specific task isolation

### File Upload
- Upload images and PDFs
- Files stored in `/uploads`
- Inline image preview (`<img>`)
- Inline PDF preview (`<iframe>`)

### UX Improvements
- Loading states
- Basic form validation (Title required)
- Disabled submit button while processing
- Empty state message
- Dark professional UI using Tailwind CSS

### Testing
- Unit test implemented using Jest
- Test verifies TaskController functionality

---

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express
- PostgreSQL (pg)
- Multer
- bcrypt
- jsonwebtoken
- Jest

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```


Start backend:

```bash
npm run dev
```


Run unit tests:

```bash
npm test
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
npm install
npm run dev
```


Frontend runs on:

http://localhost:5173/

---

## Database Schema
PostgreSQL was chosen for structured relational data and enforcing foreign key constraints between users and tasks.


### Users Table

- id
- name
- email
- password_hash
- role

### Tasks Table

- id
- title
- description
- status
- due_date
- assigned_to (foreign key to users.id)
- file_url

---

## Security Measures

- Password hashing using bcrypt
- JWT authentication
- Backend route protection via middleware
- User-specific task filtering (`assigned_to = req.user.id`)
- Protected frontend routes

---

## File Preview Handling

Images:
- Rendered using `<img>` tag

PDF:
- Rendered using `<iframe>` tag

Fallback:
- Direct file link

---

## Unit Testing

A unit test is implemented for the Task Controller using Jest.

To run tests:

```bash
npm test
```


---

## Future Enhancements

- Task search and filtering
- Pagination
- Role-based access control
- Cloud file storage (S3)
- Token expiration handling

---

## Author

Anjana Venugopal  
3-Day Workshop - Full Stack Task Tracker




