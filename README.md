# Inventory System

🇺🇸 English | 🇧🇷 [Português](README.pt-BR.md)

A backend API for managing inventory items.

This project is being built as a portfolio project to demonstrate backend development using Node.js, TypeScript, Express, and PostgreSQL.

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL

## Features (planned)

- Create inventory items
- Retrieve inventory items
- Update item quantities
- Delete items
- PostgreSQL persistence
- Internationalized API responses (English / Portuguese) using i18n

## Project Structure

inventory-system
├ backend
│ ├ src
│ ├ package.json
│ ├ tsconfig.json
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

Run the development server:

npm run dev

## Planned API

POST /items
GET /items
GET /items/:id
PATCH /items/:id
DELETE /items/:id

## Status

Work in progress.
