# BuildMas – Construction Budgeting Platform

## Project Overview

BuildMas is a full-stack web application designed to manage construction estimates and clients. It allows users (builders, contractors) to create and manage a client portfolio and generate detailed estimates for each, including labor and material costs.

This repository contains main versions of the application:

*   **`main`**: A local development version that uses a **mock authentication** system to streamline testing and development without needing cloud services.

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
    *   Mock Authentication (on the `main` branch)
*   **Containerization:**
    *   Docker
    *   Docker Compose

---

## Setup and Run Instructions

### Prerequisites

*   Docker and Docker Compose installed.
*   Git installed.
*   Node.js and npm (for local dependency management).

### Development Version (`main` branch)

This version is highly recommended for local development as it requires no Firebase setup and starts quickly.

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd buildmasweb
    ```

2.  **Switch to the `main` Branch:**
    ```bash
    git checkout main
    ```

3.  **Launch the Containers (recommended for local development with volumes):**
    *   This command will build the Docker images and run the entire application stack (frontend, backend, and database).
    ```bash
    sudo docker compose up --build -d
    ```
    *   Generating migration: this command is to generate the migration file.
    ```bash
    sudo docker compose exec backend npm run db:generate
    ```
    *   Migrating database tables: this command is to create the database tables.
    ```bash
    sudo docker compose exec backend npm run db:migrate
    ```
4.  **Or Install Local Dependencies (optional):**
    *   This command will install dependencies locally.
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```
    * Command to generate migration
    ```bash
    npm run db:generate
    ```
    * And the create database and tables
    ```bash
    npm run db:migrate
    ```

5.  **Access the Application:**
    *   **Frontend:** Open your browser and navigate to `http://localhost`.
    *   **Backend:** The API will be available at `http://localhost:3001`.

6.  **Log In (Mocked):**
    *   The login page will have default values. Simply click "Sign In" to access the application.

## Relevant Implementation Notes

*   **Data Persistence:** A table was created to store the information.
*   **Status Logic:** The status of an estimate (`initiated`, `in progress`, `completed`) is automatically calculated and assigned on the backend whenever it is created or updated, ensuring data consistency.
*   **API Security:** The API routes are protected. The backend validates a token (real or mock) on every request to identify the user and ensure they can only access their own data.
*   **Dockerized Environment:** The entire application is containerized, which guarantees a consistent development environment and simplifies deployment.

## A Brief Video Explanation
url: https://www.youtube.com/watch?v=sxMAAN22ykY
