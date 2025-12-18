# Express Todo API

This project is a REST API built with Express.js. It provides authentication using JWT and session handling, and it is a todo list with filtering, sorting and basic CRUD operations.

---

## Features

- JWT-based authentication (access + refresh tokens)
- Session invalidation using in-memory session IDs
- Protected routes using auth middleware
- Todo CRUD operations
- Filtering, sorting and limiting the todo list
- Input validation with Zod

---

## Getting started

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd express-api-project
npm install
```

### Running the project

using nodemon:

```bash
npm run dev
```

without nodemon:

```bash
npm start
```

### The server will start on:

http://localhost:3000

Health check endpoint:

GET /v1/health

A successful response will return:

```json
{
  "ok": true
}
```

## Environment Variables

The project uses the following variables:

- JWT_SECRET  
  Secret key used to sign and verify JWT tokens.  
  If not provided, a default development secret is used.  
  **This is intended for development only and should not be used in production.**

## API Endpoints

### Authentication

### POST /v1/auth/login

Logs in a user and returns access and refresh tokens.

**Headers:**
- `Content-Type: application/json`
**Request body:**
```json
{
  "username": "admin",
  "password": "Password1"
}
```

### Demo credentials

This API uses a hardcoded user for demonstration and testing purposes.

**Username:** `admin`  
**Password:** `Password1`

These credentials must be used when calling the login endpoint.


### POST /v1/auth/logout

Logs out the user and invalidates the current session.

**Headers:**
- `Authorization: Bearer <accessToken>`


### POST /v1/auth/refresh

Returns a new access token using a valid refresh token.

**Headers:**
- `x-refresh-token: <refreshToken>`


---

## Todos (protected)

For all todo endpoints:

**Headers (required):**
- `Authorization: Bearer <accessToken>`


### GET /v1/todos

Returns all todos. Supports filtering, sorting and limiting.

**Query parameters:**

- `done=true | false`
- `sort=asc | desc`
- `limit=number`


### POST /v1/todos
Creates a new todo.

**Request body:**
```json
{
  "title": "Buy groceries",
  "dueDate": "2025-01-15",
  "tags": ["shopping", "personal"]
}
```
**Response(201 Created):**
```json
{
  "id": "c1a9e3c4-8a6f-4b1e-9f2b-1d4c6a7b8e90",
  "title": "Buy groceries",
  "dueDate": "2025-01-15",
  "tags": ["shopping", "personal"],
  "done": false,
  "createdAt": 1736947200000
}
```

### GET /v1/todos/:id

Returns a single todo by id.

### PATCH /v1/todos/:id

Updates the done status of a todo.

**Request body:**
```json
{
  "done": true
}
```

### DELETE /v1/todos/:id

Deletes a todo.

## Notes

Active sessions and todos are stored in memory.
Restarting the server will clear all sessions and todos.
