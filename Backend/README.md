# 🚀 Real-Time Client Project Dashboard

## 📌 Overview

Full-stack backend system built with Node.js, Express, TypeScript, Prisma, and Socket.io.
Supports projects, tasks, roles, notifications, real-time activity, and presence tracking.

---

## 📡 API Base URL

`http://localhost:5000/api/v1`

---

## 🔐 Authentication

### POST `/auth/login`
- Body: `{ email: string, password: string }`
- Success: 200
- Response:
  - `data.user` (id, name, email, role)
  - `data.accessToken`
  - refresh token set in HttpOnly cookie `refreshToken`

### Cookie-based refresh
- controller exists but route not wired by default.
- `refreshToken` cookie expected for renewing access token.

---

## 👤 Users

### POST `/users`
- Roles: Admin
- Body: `{ name, email, password, role }`
- Creates user

### GET `/users`
- Roles: authenticated
- List users

### GET `/users/:id`
- Roles: authenticated
- Get single user

### PATCH `/users/:id`
- Roles: Admin, Project Manager
- Body optional: `{ name?, email?, password?, role? }`

### DELETE `/users/:id`
- Roles: Admin

---

## 📁 Projects

### POST `/projects`
- Roles: Admin, Project Manager
- Body: `{ name, clientName }`

### GET `/projects`
- Roles: authenticated
- Query options from controller in business logic

### GET `/projects/:id`
- Roles: authenticated

### PATCH `/projects/:id`
- Roles: Admin, Project Manager
- Body: `{ name?, clientName? }`

### DELETE `/projects/:id`
- Roles: Admin, Project Manager

---

## ✅ Tasks

### POST `/tasks`
- Roles: Admin, Project Manager
- Body:
  - `title: string`
  - `description?: string`
  - `projectId: string`
  - `assignedToId: string`
  - `priority: LOW|MEDIUM|HIGH|CRITICAL`
  - `dueDate: string (ISO)`

### GET `/tasks`
- Roles: authenticated

### PATCH `/tasks/:id`
- Roles: authenticated
- Body optional:
  - `status: TODO|IN_PROGRESS|IN_REVIEW|DONE`
  - `priority: LOW|MEDIUM|HIGH|CRITICAL`
  - `dueDate: string`

### DELETE `/tasks/:id`
- Roles: Admin, Project Manager

---

## 📝 Activities

### GET `/activities`
- Roles: authenticated

---

## 🔔 Notifications

All routes require auth cookie or access token.

### GET `/notifications`
- get all user notifications

### GET `/notifications/unread-count`
- get unread notifications count

### PATCH `/notifications/:id/read`
- mark a single notification as read

### PATCH `/notifications/read-all`
- mark all user notifications as read

---

## 📊 Dashboard

### GET `/dashboard`
- Roles: authenticated
- Returns role-aware dashboard metrics

---

## 🧩 WebSocket / Socket.io

### Connection
- URL: `ws://localhost:5000`
- Auth:
  - Option 1: `io(url, { auth: { token: accessToken } })`
  - Option 2: `io(url, { extraHeaders: { Authorization: 'Bearer ' + accessToken } })`
- Server verifies JWT with `JWT_ACCESS_SECRET` and sets `socket.data.user`.

### Rooms
- `join:project` -> payload `projectId` (client to server)
- `leave:project` -> payload `projectId`

### Presence
- Event: `presence:update`
- Payload: `{ count: number }`
- Emitted on connect/disconnect globally

### Task updates
- Client emits `task:updated` with:
  - `{ taskId, projectId, fromStatus, toStatus }`
- Server broadcasts to project room:
  - event: `activity:new`
  - payload: `{ taskId, projectId, userId, role, fromStatus, toStatus, timestamp }`
- If user role is `ADMIN`, server also emits `admin:activity` globally.

### Notifications
- Client emits `notification:new` with:
  - `{ userId, message }` (server-to-user push)
- Server emits to `user:<userId>` room:
  - event: `notification:new`
  - payload: `{ message, timestamp }`

---

## 🛡️ Auth headers

- HTTP: `Authorization: Bearer <accessToken>`
- Socket: include token in `auth` or `Authorization` header

---

## ⚙️ Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🧠 Architecture

- Express router modules for auth/user/project/task/activity/notification/dashboard
- Prisma for DB operations
- Socket.io for real-time events
- `node-cron` jobs for overdue tasks and notifications
- Role-based access control by middleware

---

## 🚀 Improvements

- Add `/auth/refresh` and `/auth/logout` routes to match controllers
- Add request validation error examples
- Add automated API tests (supertest)
- Add swagger/OpenAPI frontend contract


