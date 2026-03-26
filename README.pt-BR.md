# Sistema de Inventário

🇧🇷 Português | 🇺🇸 [English](README.md)

Uma API de gestão de inventário backend demonstrando operações CRUD RESTful com TypeScript e PostgreSQL.

Este projeto é desenvolvido como portfólio para demonstrar design de API limpo, desenvolvimento backend type-safe e persistência em banco de dados relacional.

## Stack Tecnológico

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- i18n (respostas da API em inglês e português)

## Funcionalidades

- Criar, ler, atualizar, deletar itens de inventário
- Validação de quantidade (não pode ser negativa)
- Respostas da API internacionalizadas (EN/PT-BR)
- Arquitetura TypeScript limpa
- Persistência PostgreSQL com Prisma

## Estrutura do Projeto

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

## Instalação

Clone o repositório:

```bash
git clone <repo-url>
```

Instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
```

Execute o servidor:

```bash
npm run dev
```

## Endpoints da API

```
POST   /items      # Criar item de inventário
GET    /items      # Listar todos os itens
GET    /items/:id  # Obter item único
PATCH  /items/:id  # Atualizar item
DELETE /items/:id  # Deletar item
GET    /health     # Verificação de saúde
```

## Modelo de Dados

```typescript
model Item {
  id        String   @id @default(uuid())
  name      String
  quantity  Int      // >= 0
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Regras de Negócio

- `quantity` não pode ser negativa
- Criar um item requer `name` e `quantity`
- Respostas da API incluem mensagens de sucesso/erro em inglês ou português
- Estrutura de erro JSON consistente

## Status

Fase 1-2 Completa: Fundamentos e configuração do banco.
Fase 3 Em Progresso: Implementação dos endpoints CRUD.
