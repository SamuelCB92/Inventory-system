# Full-Stack Inventory System

[![Live Demo](https://img.shields.io/badge/Live_Demo-inventory--system--samuel.vercel.app-646CFF?style=for-the-badge&logo=vercel&logoColor=white)](https://inventory-system-samuel.vercel.app)

🇺🇸 **English** | 🇧🇷 [Português](README.pt-BR.md)

A specialized inventory management dashboard built with a professional, type-safe full-stack architecture. This project showcases **React (Vite)** on the frontend and **Node.js (Express)** on the backend, featuring a customized dark-mode aesthetic and robust multi-language support.

---

## Features

- **Interactive Dashboard**: Modern UI with real-time statistics (Total Items, Categories, Low Stock).
- **Multi-language Support (i18n)**: Fully translated UI and specialized database fields for localized item content (English & Portuguese).
- **Advanced Inventory Management**: 
    - Full CRUD operations with instant UI updates.
    - Specialized SKU tracking.
    - Automated Low Stock indicators.
- **Robust Backend**:
    - RESTful API with standardized JSON responses.
    - Advanced filtering, searching, and pagination.
    - Type-safe persistence using **Prisma ORM** and **PostgreSQL**.

---

## Tech Stack

### Frontend
- **React 18** + **Vite** (for blazing fast HMR).
- **TypeScript** for end-to-end type safety.
- **Custom CSS** (Vanilla) with a focus on modern glassmorphism and dark-mode aesthetics.
- **React Hooks** for sophisticated state management.

### Backend
- **Node.js** + **Express**.
- **Prisma ORM** (Client-side typing).
- **PostgreSQL** relational database.
- **Jest/Supertest** for comprehensive integration testing.

### Deployment
- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)
- **Database**: [Neon](https://neon.tech) (PostgreSQL)

---

## Seed Data

The production database is pre-populated with **15 realistic IT inventory items** (peripherals, storage, networking, power, and office supplies). Each item includes bilingual fields (English and Portuguese) and several low-stock examples for demo purposes.

Seeding is handled by an idempotent upsert script at `backend/prisma/seed.ts`, so it is safe to run multiple times without creating duplicates. In Docker/Render deployments, the seed runs automatically on container startup after migrations.

To seed a local database manually:

```bash
cd backend
npx prisma db seed
```

---

## Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally or a remote connection string)

### 1. Database Setup
1. Create a database in PostgreSQL (e.g., `inventory_db`).
2. Update the `backend/.env` with your `DATABASE_URL`.

### 2. Backend Installation & Setup
```bash
cd backend
npm install

# Run migrations to set up the schema
npx prisma migrate dev --name init

# Start dev server
npm run dev
```
*The API will be available at `http://localhost:3000`.*

### 3. Frontend Installation & Setup
```bash
cd frontend
npm install

# Create frontend/.env and point the app at your backend API
# Example for local development:
# VITE_API_URL=http://localhost:3000

# Start dev server
npm run dev
```
*The dashboard will be available at `http://localhost:5173`.*

> **Note:** `VITE_API_URL` must be set in `frontend/.env` for the frontend to connect to the backend. Without it, the app falls back to `http://localhost:3000`.

---

## Docker Quick Start (Recommended)

The easiest way to run the entire project (Database, API, and Dashboard) is through Docker.

### 1. Launch the Stack
```bash
docker-compose up --build
```
- **Dashboard**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

### 2. Run Automated Tests in Docker
```bash
docker-compose run --rm backend-test
```
*This spins up a dedicated test database, runs the Jest suite, and cleans up after completion.*

---

## API Reference

All requests follow the structure: `http://localhost:3000/items?lang=en`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/items` | List items (supports `page`, `limit`, `search`, `category`) |
| `POST` | `/items` | Create a new item |
| `GET` | `/items/:id` | Get details for a single item |
| `PATCH` | `/items/:id` | Update an existing item |
| `DELETE` | `/items/:id` | Remove an item |
| `GET` | `/items/low-stock` | Get items currently below threshold |

---

## Testing

The backend includes a comprehensive test suite covering all business rules (SKU validation, quantity constraints, i18n).

```bash
cd backend
npm test
```

---

## Project Structure

```text
├── backend/            # Express server & Prisma schema
│   ├── prisma/         # Database migrations
│   ├── src/
│   │   ├── controllers/# Request handlers
│   │   ├── services/   # Business logic (database access)
│   │   └── i18n/       # Localization JSONs
└── frontend/           # Vite + React app
    ├── src/
    │   ├── api/        # Axios/Fetch client
    │   ├── components/ # Reusable UI components
    │   └── context/    # Language/UI state
```

---

## 🇧🇷 Internationalization (i18n)
This system is truly bilingual. Users can toggle the entire interface between English and Portuguese. Unlike simple UI translations, the database actively stores content in both languages:
- `name` / `namePT`
- `category` / `categoryPT`
- `description` / `descriptionPT`
