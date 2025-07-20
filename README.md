# BuildMas – Construction Budgeting Platform

## Project Overview

BuildMas is a full-stack web application designed to manage construction estimates and clients. It allows users (builders, contractors) to create and manage a client portfolio and generate detailed estimates for each, including labor and material costs. The application features an authentication and role system, with an administrator view to supervise platform activity.

This repository contains two main versions of the application in separate branches:

*   **`main`**: The production-ready version, which uses **Firebase Authentication** for real user management.
*   **`mock`**: A local development version that uses a **mock authentication** system to streamline testing and development without needing cloud services.

---

## Technologies Used

*   **Backend:**
    *   Node.js
    *   Express.js
    *   TypeScript
    *   PostgreSQL
    *   Drizzle ORM
*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Material-UI (MUI)
*   **Authentication:**
    *   Firebase Authentication (on the `main` branch)
    *   Mock Authentication (on the `mock` branch)
*   **Containerization:**
    *   Docker
    *   Docker Compose

---

## Setup and Run Instructions

### Prerequisites

*   Docker and Docker Compose installed.
*   Git installed.
*   Node.js and npm (for local dependency management).

### Development Version (`mock` branch)

This version is highly recommended for local development as it requires no Firebase setup and starts quickly.

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd devbuildmas
    ```

2.  **Switch to the `mock` Branch:**
    ```bash
    git checkout mock
    ```

3.  **Install Local Dependencies:**
    *   This is necessary for your code editor to recognize packages and for Git management.
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```

4.  **Launch the Containers:**
    *   This command will build the Docker images and run the entire application stack (frontend, backend, and database).
    ```bash
    sudo docker compose up --build -d
    ```

5.  **Access the Application:**
    *   **Frontend:** Open your browser and navigate to `http://localhost`.
    *   **Backend:** The API will be available at `http://localhost:3001`.

6.  **Log In (Mocked):**
    *   The login page will have default values. Simply click "Sign In" to access the application.

### Production Version (`main` branch)

This version uses real Firebase services and requires additional setup.

1.  **Switch to the `main` Branch:**
    ```bash
    git checkout main
    ```

2.  **Firebase Setup:**
    *   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Authentication** with the **Email/Password** provider.
    *   **Frontend:** Get your `firebaseConfig` object and paste it into the `frontend/src/firebase.ts` file.
    *   **Backend:** Go to "Project settings" > "Service accounts", generate a new private key, and save the resulting JSON file as `backend/serviceAccountKey.json`.

3.  **Environment Variable Setup:**
    *   In the `backend/.env` file, ensure the `ADMIN_UID` variable is set to the UID of the user who will be the administrator.

4.  **Launch the Containers:**
    ```bash
    sudo docker compose up --build -d
    ```

5.  **Access the Application:**
    *   Navigate to `http://localhost` and register or sign in with a Firebase user.

---

## Relevant Implementation Notes

*   **Data Persistence:** A table was created to store the information.
*   **Status Logic:** The status of an estimate (`initiated`, `in progress`, `completed`) is automatically calculated and assigned on the backend whenever it is created or updated, ensuring data consistency.
*   **API Security:** The API routes are protected. The backend validates a token (real or mock) on every request to identify the user and ensure they can only access their own data.
*   **Dockerized Environment:** The entire application is containerized, which guarantees a consistent development environment and simplifies deployment.