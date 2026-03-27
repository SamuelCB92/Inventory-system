# Inventory System

🇺🇸 English | 🇧🇷 [Português](README.pt-BR.md)

A backend inventory management API demonstrating RESTful CRUD operations with TypeScript and PostgreSQL.

This project is built as a portfolio project to showcase clean API design, type-safe backend development and relational database persistence.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- i18n (English and Portuguese API responses)

## Features

- ✅ Create, read, update, delete inventory items
- ✅ Quantity validation (non-negative integers)
- ✅ Internationalized API responses (English/Portuguese)
- ✅ Type-safe TypeScript architecture
- ✅ PostgreSQL persistence with Prisma ORM

## Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL (running locally or remote connection)

### Installation

```bash
git clone <repo-url>
cd backend
npm install
```

### Environment Setup

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
```

### Run Development Server

```bash
npm run dev
```

Server starts on `http://localhost:3000`

## API Documentation

### Base URL

```
http://localhost:3000
```

### Response Format

All API responses follow a consistent JSON structure:

**Success Response:**

```json
{
  "success": true,
  "message": "Item created successfully",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Name is required"
}
```

### Internationalization (i18n)

All API messages support English (`en`) and Portuguese (`pt-BR`).

**Request with language parameter:**

```
GET /items?lang=pt-BR
```

**Portuguese Response:**

```json
{
  "success": true,
  "message": "Itens recuperados com sucesso",
  "data": { "items": [...], "count": 1 }
}
```

If no language is specified, the API defaults to English.

### Endpoints

#### 1. Create Item

**Request:**

```
POST /items?lang=en
Content-Type: application/json

{
  "name": "Laptop",
  "quantity": 5
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop",
    "quantity": 5,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T06:32:23.638Z"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Name is required"
}
```

#### 2. List All Items

**Request:**

```
GET /items?lang=en
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": {
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Laptop",
        "quantity": 5,
        "createdAt": "2026-03-27T06:32:23.638Z",
        "updatedAt": "2026-03-27T06:32:23.638Z"
      }
    ],
    "count": 1
  }
}
```

#### 3. Get Single Item

**Request:**

```
GET /items/:id?lang=en
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Item retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop",
    "quantity": 5,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T06:32:23.638Z"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Item not found"
}
```

#### 4. Update Item

**Request:**

```
PATCH /items/:id?lang=en
Content-Type: application/json

{
  "quantity": 10
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop",
    "quantity": 10,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T10:00:00.000Z"
  }
}
```

#### 5. Delete Item

**Request:**

```
DELETE /items/:id?lang=en
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

#### 6. Health Check

**Request:**

```
GET /health
```

**Response (200 OK):**

```json
{
  "status": "ok"
}
```

## Data Model

```typescript
model Item {
  id        String   @id @default(uuid())
  name      String
  quantity  Int      // Must be >= 0
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Business Rules

- **Quantity Validation**: Must be a non-negative integer (>= 0)
- **Required Fields**: Creating an item requires both `name` and `quantity`
- **Type Safety**: Name must be a string, quantity must be an integer
- **Consistency**: All API responses follow the standard JSON format
- **Error Handling**: All errors include localized messages and appropriate HTTP status codes
