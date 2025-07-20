# Functional Analysis: BuildMas - Construction Budgeting Platform

## 1. Introduction and General Objective

The project's objective is to develop a full-stack Single Page Application (SPA) for managing construction estimates and clients. The platform will allow users to create, view, edit, and delete estimates and clients, applying specific business rules for cost calculation and status management.

## 2. User Roles

Two main roles are defined in the system:

1.  **Registered User (Builder/Contractor):** The primary user of the application. They can manage their own client portfolio and the estimates associated with each client.

## 3. Main System Entities

*   **User:** Represents the person using the application. Each user has their own login credentials and owns their client and estimate information.
*   **Client:** Represents the end customer for whom an estimate is created. Each client is associated with a single User.
*   **Estimate:** The central document of the application. It represents a quote for a construction job and is composed of labor and material costs. Each estimate is associated with a single Client.

## 4. Functional Requirements (FR)

### FR-01: User Authentication Management
*   **New User Registration:** The system must allow a person to register on the platform by providing their basic data.
*   **Login:** Registered users must be able to access the system using their credentials.

### FR-02: Client Management (CRUD)
*   **Create Client:** A registered user must be able to add new clients to their portfolio.
*   **Read Clients:** A registered user must be able to see a list of all their clients.
*   **Update Client:** A registered user must be able to modify the information of an existing client.
*   **Delete Client:** A registered user must be able to remove a client from their portfolio.

### FR-03: Estimate Management (CRUD)
*   **Create Estimate:** A user must be able to create a new estimate, assigning it a title, a description, and associating it with one of their clients.
*   **Estimate Detail and Editing:**
    *   The user can add or modify the **labor cost**.
    *   The user can dynamically add, edit, or delete **material lines** in the form. Each material line must contain: name, quantity, and unit price.
*   **Automatic Calculations:**
    *   The system must automatically calculate the **total for each material line** (quantity × unit price).
    *   The system must automatically calculate the **total material cost** (the sum of the totals of all material lines).
    *   The system must automatically calculate the **total estimate cost** (labor cost + total material cost).
*   **View Estimates:** The user must be able to see a list of all their estimates, with their current status indicated by a color code.
*   **Delete Estimate:** The user must be able to delete an existing estimate.

### FR-04: Estimate Status Logic
The status of an estimate must be managed as follows, with visual color indicators:

*   **Initiated (Yellow):** The default state when an estimate is created.
*   **In Progress (Orange):** The system will automatically change the status to "In Progress" when the estimate has an assigned client, at least one material with a quantity, and a defined labor cost.
*   **Completed (Green):** The user can manually change the status to "Completed", but only if the estimate is already in the "In Progress" state.

### FR-05: Administrator Functionality
*   **View All Clients:** The administrator can see a list of all clients registered on the platform, regardless of which user they belong to.
*   **View All Estimates:** The administrator can see all estimates created on the platform.
*   **View Platform Summary:** The administrator has access to a summary view with general statistics (e.g., total number of users, clients, estimates).

## 5. Non-Functional Requirements (NFR)

*   **NFR-01: Mandatory Technology Stack:**
    *   **Backend:** Node.js, TypeScript
    *   **Frontend:** React, TypeScript, Vite
    *   **Database:** PostgreSQL
    *   **ORM:** Drizzle ORM
*   **NFR-02: Architecture:** The application must be a Single Page Application (SPA) with a REST API backend that manages business logic and data access.
*   **NFR-03: Code:** The code must be clean, modular, and well-structured to facilitate maintenance and scalability.
