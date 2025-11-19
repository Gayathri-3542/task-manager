# Task Manager (MERN Stack)

A full-stack Task Manager application built using the MERN stack with Material UI, Dark Mode, Filters, Search, Sorting, Pagination, and Modal-based task creation.

---

## Tech Stack

- MongoDB
- Express.js
- React (Vite)
- Node.js
- Material UI (MUI)
- Axios

---

## Project Structure

task-manager/  
│── backend/  
│   ├── models/  
│   ├── routes/  
│   ├── controllers/  
│   ├── server.js  
│   ├── .env  
│   └── package.json  
│  
└── frontend/  
    ├── src/  
    ├── public/  
    ├── .env  
    └── package.json  

---

# Backend Setup

### Step 1: Navigate to backend folder
     cd backend
### Step 2: Install dependencies
     npm install
### Step 3: Create `.env` file
     MONGO_URI=mongodb://localhost:27017/task-manager
     PORT=5000
### Step 4: Start backend server
     npm run dev
     
Backend will run at:http://localhost:5000

# Frontend Setup

### Step 1: Navigate to frontend folder
    cd frontend
### Step 2: Install dependencies
    npm install
### Step 3: Create `.env` file (optional)
    VITE_API_URL=http://localhost:5000/api

### Step 4: Start frontend
    npm run dev

Frontend will run at:http://localhost:5173


---

# Features

- Create, Update, Delete tasks
- Material UI modern design
- Dark and Light modes
- Modal for creating tasks
- Filters: Pending, In Progress, Completed
- Search bar
- Sorting by Newest / Oldest
- Pagination / Load More button
- Responsive layout

---

# API Endpoints

### Get all tasks
    GET /api/tasks

### Create task
    POST /api/tasks

### Update task
    PUT /api/tasks/:id
### Delete task
    DELETE /api/tasks/:id

---

# Running Full Project

### Terminal 1 (Backend)
    cd backend
    npm run dev

### Terminal 2 (Frontend)
     cd frontend
     npm run dev
   

