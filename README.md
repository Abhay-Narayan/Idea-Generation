```markdown
# MERN Stack Starter Template

This is a starter template for a Idea generation springboard. Follow the steps below to set it up locally with a remote MongoDB database.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Team Setup](#team-setup)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Overview

This template provides a basic setup for a MERN stack project with a remote MongoDB database (e.g., MongoDB Atlas). It helps a team of three developers get started with frontend, backend, and database integration.

## Technologies

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Version Control**: Git

## Team Setup

This template is ideal for a team of 3 developers. Each team member can work on different parts of the project, such as:

1. **Frontend Developer**: Works on the React application.
2. **Backend Developer**: Manages the Node.js/Express server and APIs.
3. **Database Manager**: Configures and manages MongoDB on MongoDB Atlas.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

Additionally, you'll need access to a MongoDB instance. We recommend using **MongoDB Atlas**, a cloud database service. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

Each team member should clone the repository:

```bash
git clone https://github.com/Abhay-Narayan/Idea-Generation.git
cd mern-starter-template
```

### 2. Install dependencies

Install the necessary dependencies for both the backend and frontend.

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd ../client
npm install
```

### 3. Set up MongoDB on MongoDB Atlas

1. **Sign up for MongoDB Atlas** if you haven't already.
2. **Create a new cluster** in the Atlas dashboard.
3. **Configure network access**: Allow access from your local machine or whitelist all IP addresses (`0.0.0.0/0`) for development.
4. **Create a database user** with a username and password.
5. **Get your connection string** from the MongoDB Atlas dashboard.

Example connection string:

```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

### 4. Set up Environment Variables

In the `server` directory, create a `.env` file and add the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>
```

Replace `<username>`, `<password>`, and `myDatabase` with your actual MongoDB Atlas credentials and database name.

### 5. Run the application

Start both the backend and frontend servers.

#### Backend
```bash
cd server
npm run dev
```

#### Frontend
```bash
cd ../client
npm start
```

The backend will run on `http://localhost:5000`, and the frontend will run on `http://localhost:3000`.

## Project Structure

The project is organized as follows:

```
mern-starter-template/
│
├── client/               # React frontend
│   ├── src/
│   └── public/
│
├── server/               # Node.js backend
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── controllers/      # Route handlers
│   ├── config/           # Configuration files
│   └── server.js         # Main entry point for the backend
│
└── README.md
```

## Usage

Once the backend and frontend are running, access the application at:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

## Environment Variables

Configure the following environment variables in the `.env` file in the `server` folder:

- **PORT**: The port for the backend server (default: `5000`)
- **MONGO_URI**: Your MongoDB Atlas connection string.
- **JWT_SECRET**: A secret key for JWT authentication.

## Contributing

1. Each team member should create their own branch for their specific feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Once the feature is complete, push the branch and create a pull request for review:
   ```bash
   git push origin feature/your-feature-name
   ```

## License

This project is licensed under the MIT License.
