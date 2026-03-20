# Sistema de Inventário

🇧🇷 Português | 🇺🇸 [English](README.md)

Uma API backend para gerenciamento de itens de inventário.

Este projeto está sendo desenvolvido como parte de um portfólio para demonstrar desenvolvimento backend utilizando Node.js, TypeScript, Express e PostgreSQL.

## Stack

- Node.js
- Express
- TypeScript
- PostgreSQL

## Funcionalidades (planejadas)

- Criar itens de inventário
- Listar itens
- Atualizar quantidade
- Deletar itens
- Persistência com PostgreSQL
- Respostas da API internacionalizadas (Inglês / Português)

## Instalação

Clone o repositório:

git clone <repo-url>

Instale as dependências:

cd backend
npm install

Crie um arquivo `.env`:

DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000

Execute o servidor:

npm run dev
