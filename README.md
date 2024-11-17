# Health Tracker App - REST API

## Project Overview

The **Health Tracker App** is a full-stack web application designed to track various aspects of an individual's health. It allows users to create, update, view, and delete health data related to metrics such as weight, height, heart rate, blood pressure, blood test results, and menstrual cycles.

The app's backend is built using **Node.js**, **Express**, and **MongoDB**. The backend implements **RESTful API** principles to handle CRUD (Create, Read, Update, Delete) operations for managing user profiles and health data.

---

## Features

- **Create** a new user profile and health records.
- **Read** user profiles, health metrics, blood test results, and menstrual cycle data.
- **Update** existing user profiles or health data.
- **Delete** user profiles and health records.

---

## API Endpoints

The API has the following endpoints:

### User Profile Routes

1. **GET /api/userprofile/getall**  
   - Returns all user profiles in the database.
  
2. **GET /api/userprofile/:id**  
   - Returns a single user profile by its `id`.

3. **POST /api/userprofile/add**  
   - Creates a new user profile.

4. **PATCH /api/userprofile/update/:id**  
   - Updates a user profile with the given `id`.

5. **DELETE /api/userprofile/delete/:id**  
   - Deletes a user profile by its `id`.

### Additional Routes
Other routes have been planned for managing health metrics, blood tests, and menstrual cycles, but the user profile routes are functional at the moment.

---


