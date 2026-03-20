# Inventory System

🇺🇸 English | 🇧🇷 [Português](README.pt-BR.md)

A backend-first inventory management API focused on clean architecture and real-world backend fundamentals.

This project is built as a portfolio project to demonstrate authentication, relational modeling, validation, stock logic, and deployable API development.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

## Features (planned)

- User registration and login
- JWT-based protected routes
- Product CRUD per authenticated user
- Inventory transactions (`IN` / `OUT`)
- Computed stock (`SUM(IN) - SUM(OUT)`)
- Low-stock checker (background job in later phase)

## Project Structure

inventory-system
├ backend
│ ├ src
│ │ ├ routes
│ │ ├ controllers
│ │ ├ services
│ │ ├ middleware
│ ├ package.json
│ ├ tsconfig.json
│ ├ prisma
│ └ ...
└ README.md

## Setup

Clone the repository:

git clone <repo-url>

Install dependencies:

cd backend
npm install

Create a `.env` file:

DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
JWT_SECRET=replace_with_a_strong_secret

Run the development server:

npm run dev

## Planned API

POST /auth/register
POST /auth/login

POST /products
GET /products
GET /products/:id
PATCH /products/:id
DELETE /products/:id

POST /products/:id/transactions
GET /products/:id/stock

## Status

Work in progress.
