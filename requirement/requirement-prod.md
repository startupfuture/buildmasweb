# BuildMas – Construction budget estimating platform

**Required Stack**: Node.js · PostgreSQL · React · TypeScript · Drizzle ORM · Vite

---


## Objective

Build a full stack web application to manage construction estimates and clients.  
The goal is:

- Implement full CRUD functionality
- Model and handle relational data
- Apply business rules (status transitions, calculations)
- Structure a clean and modular codebase
- Use the required technologies effectively
- A Single Page Application (SPA)

---

## What is an Estimate?

An **estimate** represents a construction-related task or project quotation.  
Examples include painting a room, building a roof, installing flooring, or any other construction activity that requires cost estimation and materials planning.

Each estimate is linked to a client and includes labor and materials cost breakdown.

---

## Minimum Requirements

- Use **Node.js**, **PostgreSQL**, **React**, **Drizzle ORM**, **Vite**, and **TypeScript**
- Implement the following entities:
  - `User` (can be mocked or hardcoded)
  - `Client`
  - `Estimate`
- Basic authentication using Firebase Authentication for user login and registration
- A `Client` belongs to a `User`
- An `Estimate` belongs to a `Client`
- An admin user can view the quotes created by each client, view registered clients, and view the platform summary.

---

## Estimate Structure

### Fields

- `title`: string  
- `description`: string  
- `clientId`: reference to `Client`  
- `laborCost`: number  
- `materials`: array (frontend only, not persisted in DB)  
- `materialsTotal`: sum of all material line totals  
- `totalCost`: calculated as `laborCost + materialsTotal`  
- `status`: one of `"initiated"`, `"in progress"`, `"completed"`

### Materials (in estimate form)

Each material UI includes:

- `name`: string  
- `quantity`: number  
- `unitPrice`: number  
- `total`: auto-calculated as `quantity × unitPrice`

---

## Estimate Status Logic

| Status      | Description                                                                                       | Color   |
|-------------|---------------------------------------------------------------------------------------------------|---------|
| initiated   | Default state when the estimate is created                                                        | Yellow  |
| in progress | Set automatically when the estimate has a client, materials (with quantity), and labor cost set  | Orange  |
| completed   | Set manually by the user, only if the estimate is already in `in progress`                        | Green   |

---

## Functional Scope

- CRUD operations for `Client` and `Estimate`
- Assign a client to each estimate
- Add/edit materials dynamically in the estimate form (frontend-only)
- Auto-calculate:
  - Material `total`
  - `materialsTotal`
  - `totalCost = laborCost + materialsTotal`
- Status transitions with color-coded indicators

---

## Technical Expectations

- The solution must use at least the required stack: **Node.js**, **PostgreSQL**, **React**, and **TypeScript**
- Backend: Node.js + PostgreSQL
- Frontend: React + TypeScript
- Clean code structure and modular organization
- Optional: basic validations
- You may use any additional libraries or tools you find appropriate, as long as their use is justified briefly in the video explanation

---