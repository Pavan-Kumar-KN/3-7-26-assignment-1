
# Student Management System

A full-stack monorepo application for managing students, built with modern technologies using Turborepo.

> **Assignment Date:** March 7, 2026

---

## 🏗️ Project Structure

```
├── apps/
│   ├── api/          # NestJS Backend API
│   └── client/       # React Frontend
├── packages/         # Shared packages
├── docker-compose.yml
└── turbo.json
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.x | UI Library |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | 4.x | UI Components |
| Zustand | 5.x | State Management |
| XLSX | 0.18.x | Excel Export |
| Lucide React | - | Icons |

### Backend
| Technology | Version | Description |
|------------|---------|-------------|
| NestJS | 11.x | Node.js Framework |
| Prisma | 6.x | ORM |
| PostgreSQL | 16 | Database |
| Docker | - | Containerization |
| class-validator | - | DTO Validation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.x
- Docker & Docker Compose

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3-7-26-assignment-1
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the database**
   ```bash
   docker compose up -d
   ```

4. **Set up environment variables**
   
   Create `apps/api/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/assignment_db"
   ```

5. **Run database migrations**
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Start the development servers**
   ```bash
   # From root directory
   pnpm dev
   ```

### Access the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |

---

## 📦 Database Schema

### Student Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | Int | Primary key (auto-increment) |
| `number` | Int | Unique student number (auto-increment) |
| `name` | String | Student's full name |
| `email` | String | Unique email address |
| `age` | Int | Student's age |

---

## 🔌 API Endpoints

### Student CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/student` | Create a new student |
| `GET` | `/student` | Get all students |
| `GET` | `/student/:id` | Get a student by ID |
| `PATCH` | `/student/:id` | Update a student |
| `DELETE` | `/student/:id` | Delete a student |

> 📄 See [API Documentation](./apps/api/doc/curl.md) for detailed curl examples.

---

## 🐳 Docker Commands

```bash
# Start PostgreSQL container
docker compose up -d

# Stop container
docker compose down

# View logs
docker compose logs -f

# Reset database (removes all data)
docker compose down -v
docker compose up -d
```

---

## 📜 Available Scripts

### Root Level (Turborepo)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm format` | Format code with Prettier |

### API (`apps/api`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start API in watch mode |
| `pnpm build` | Build for production |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run migrations |

### Client (`apps/client`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

---

## 📝 Notes

- Frontend and Backend are **not integrated** in this assignment
- Each app runs independently on its own port
- Database data persists in a Docker volume


###  `apps/api/doc/curl.md`:

# 🔌 Student API - cURL Examples

Base URL: `http://localhost:3000`

---

## 📝 Create Student

**Request:**
```bash
curl -X POST http://localhost:3000/student \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 21
  }'
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "number": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 21
}
```

---

## 📋 Get All Students

**Request:**
```bash
curl -X GET http://localhost:3000/student
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "number": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 21
  }
]
```

---

## 🔍 Get Student by ID

**Request:**
```bash
curl -X GET http://localhost:3000/student/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "number": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 21
}
```

**Error Response:** `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Student with ID 1 not found",
  "error": "Not Found"
}
```

---

## ✏️ Update Student

**Request:**
```bash
curl -X PATCH http://localhost:3000/student/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "age": 22
  }'
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "number": 1,
  "name": "John Updated",
  "email": "john@example.com",
  "age": 22
}
```

---

## 🗑️ Delete Student

**Request:**
```bash
curl -X DELETE http://localhost:3000/student/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "number": 1,
  "name": "John Updated",
  "email": "john@example.com",
  "age": 22
}
```

---

## ⚠️ Validation Errors

If you send invalid data, you'll get a `400 Bad Request`:

```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "email must be an email",
    "age must be a number"
  ],
  "error": "Bad Request"
}



