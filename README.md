# Inventory System

🇺🇸 English | 🇧🇷 [Português](README.pt-BR.md)

A backend inventory management API demonstrating RESTful CRUD operations with TypeScript and PostgreSQL.

This project is built as a portfolio project to demonstrate clean API design, type-safe backend development, and relational database persistence.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- i18n (English and Portuguese API responses)

## Features

- Create, read, update, delete inventory items
- Quantity validation (cannot be negative)
- Internationalized API responses (EN/PT-BR)
- Clean TypeScript architecture
- PostgreSQL persistence with Prisma

## Project Structure

```
inventory-system/
├─ backend/
│  ├─ src/
│  │  ├─ app.ts
│  │  ├─ server.ts
│  │  ├─ routes/
│  │  ├─ i18n/
│  │  └─ prisma/
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ migrations/
│  ├─ package.json
│  └─ tsconfig.json
├─ README.md
└─ README.pt-BR.md
```

## Setup

Clone the repository:

```bash
git clone <repo-url>
```

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
```

Run the development server:

```bash
npm run dev
```

## API Endpoints

```
POST   /items      # Create inventory item
GET    /items      # List all items
GET    /items/:id  # Get single item
PATCH  /items/:id  # Update item
DELETE /items/:id  # Delete item
GET    /health     # Health check
```

## Data Model

```typescript
model Item {
  id        String   @id @default(uuid())
  name      String
  quantity  Int      // >= 0
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Business Rules

- `quantity` cannot be negative
- Creating an item requires `name` and `quantity`
- API responses include success/error messages in English or Portuguese
- Consistent JSON error structure

## Status

Phase 1-2 Complete: Foundation and database setup.
Phase 3 In Progress: CRUD endpoints implementation.
