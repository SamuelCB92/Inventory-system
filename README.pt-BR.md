# Sistema de Inventário

🇧🇷 Português | 🇺🇸 [English](README.md)

Uma API backend-first de gestão de inventário com foco em arquitetura limpa e fundamentos reais de backend.

Este projeto está sendo desenvolvido como portfólio para demonstrar autenticação, modelagem relacional, validação, lógica de estoque e construção de API pronta para deploy.

## Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

## Funcionalidades (planejadas)

- Registro e login de usuário
- Rotas protegidas com JWT
- CRUD de produtos por usuário autenticado
- Transações de estoque (`IN` / `OUT`)
- Estoque calculado (`SUM(IN) - SUM(OUT)`)
- Verificação de baixo estoque (job em fase posterior)

## Estrutura do Projeto

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
└ README.pt-BR.md

## Instalação

Clone o repositório:

git clone <repo-url>

Instale as dependências:

cd backend
npm install

Crie um arquivo `.env`:

DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
JWT_SECRET=substitua_por_um_segredo_forte

Execute o servidor:

npm run dev

## API Planejada

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

Em progresso.
