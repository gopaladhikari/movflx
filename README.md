# Movflx Website

## Description

Movflx is a MERN stack website that allows users to explore and interact with a collection of movies and TV shows. It provides features for user authentication, including Google authentication and email/password authentication. Users can perform CRUD operations on movies and TV shows, as well as interact with the content through comments, likes, and replies.

## Technologies Used

-  MongoDB: A NoSQL database used for storing application data.
-  Express.js: A Node.js framework used for building web applications and APIs.
-  Next.js: A JavaScript library used for building user interfaces and sever logic.
-  Node.js: A JavaScript runtime used for server-side development.

## Features

1. **User Authentication**

   -  Google authentication
   -  Email/password authentication

2. **Movie and TV Show Management**

   -  Create, Read, Update, Delete (CRUD) operations

   -  Authentication using Google

3. **User Interactions**
   -  Comments
   -  Likes
   -  Replies to comments

## File Structure

-  **server (node.js/express)**

   -  Routes
   -  Controllers
   -  Models
   -  Authentication middleware

-  **client (next.js)**
   -  Components
   -  Redux for state management
   -  API calls to backend

## Authentication Flow

-  Google OAuth
-  Email/password authentication

### To run this application locally

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

**Prerequisites**

Make sure you have the following software installed on your system:

-  Node.js and npm (Node Package Manager)
-  MongoDB

**Installation**

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/gopaladhikari/sample-mflix
   ```

2. Navigate to the **server** and **client** directory respectively and run:

   ```bash
   yarn install
   ```

3. Create `.env` file and add the variable from `.env.sample` file with their values

4. Start the server:

   ```bash
   yarn start
   ```

5. Start the client:

   ```bash
   yarn start
   ```
