# Farmify

## Overview

This project consists of a backend API server, a frontend client, and a MySQL database. Below are instructions to set up each part of the project locally.

## Table of Contents

- Prerequisites
- Backend Setup
- Frontend Setup
- Database Setup
- Environment Variables

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm (v6 or later)
- MySQL (v5.7 or later)

### Environment Variables

Create an `.env` file in the project root for the backend and paste the provided code inside it.

## Database Setup

You can use DBeaver to import the database dump:

1. **Open DBeaver**:

   - Launch DBeaver on your system.

2. **Create a New Database Connection**:

   - Go to **Database > New Database Connection**.
   - Select **MySQL** and click **Next**.
   - Enter your MySQL server details (e.g., `localhost` as the host, and enter your username and password).
   - Click **Finish** to establish the connection.

3. **Create the Database**:

   - Right-click on the connection in the **Database Navigator** pane, and select **SQL Editor > New SQL Script**.
   - Run the following command to create your database:
     ```sql
     CREATE DATABASE livestock-marketplace-db;
     ```
   - Refresh the database list by right-clicking on the connection and selecting **Refresh**.

4. **Import the Database Dump**:

   - Right-click on your newly created `livestock-marketplace-db` and select **Tools > Restore Database**.
   - In the **Import Database** wizard, locate the dump file by navigating to the `db` folder in your backend project and selecting `init.sql`.
   - Confirm the selected file and click **Start** to import.

5. **Verify Import**:
   - Once the import is complete, expand the `livestock-marketplace-db` node to verify that tables were created correctly.

## Backend Setup

1. Navigate to the Backend Directory
   cd backend

2. Install Dependencies
   npm install

3. Start the Backend Server
   npm start

The backend server should now be running at http://localhost:4000.

## Frontend Setup

1. Navigate to the Frontend Directory
   cd frontend

2. Install Dependencies
   npm install

3. Start the Frontend Server
   npm start

The frontend server should now be running at http://localhost:3000.

You should now have the project running with the backend server on port 4000, the frontend on port 3000, and the database connected.
