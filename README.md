# Grocery List MERN Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing your grocery shopping list with complete CRUD functionality.

## Features

- Create, read, update, and delete grocery items
- Mark items as purchased
- Categorize grocery items
- Responsive design with Bootstrap

## Tech Stack

- **Frontend**: React.js, Bootstrap, React-Bootstrap, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Clone the repository
2. Install backend dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/grocery-list
   PORT=5000
   NODE_ENV=development
   ```
   (Replace the MONGO_URI with your MongoDB connection string if using Atlas)

### Frontend Setup

1. Install frontend dependencies:
   ```
   npm run client-install
   ```

### Running the Application

- To run the backend server only:
  ```
  npm run server
  ```

- To run the frontend client only:
  ```
  npm run client
  ```

- To run both frontend and backend concurrently:
  ```
  npm run dev
  ```

## API Endpoints

- **GET** `/api/groceries` - Get all grocery items
- **POST** `/api/groceries` - Create a new grocery item
- **PUT** `/api/groceries/:id` - Update a grocery item
- **DELETE** `/api/groceries/:id` - Delete a grocery item

## Usage

1. Add grocery items using the form
2. View your grocery list organized by categories
3. Mark items as purchased with the check button
4. Edit items with the edit button
5. Delete items with the trash button
