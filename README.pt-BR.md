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

- ✅ Criar, ler, atualizar, deletar itens de inventário
- ✅ Validação de quantidade (inteiros não-negativos)
- ✅ Respostas da API internacionalizadas (inglês/português)
- ✅ Arquitetura TypeScript type-safe
- ✅ Persistência PostgreSQL com Prisma ORM

## Início Rápido

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL (executando localmente ou conexão remota)

### Instalação

```bash
git clone <repo-url>
cd backend
npm install
```

### Configuração do Ambiente

Crie um arquivo `.env` no diretório `backend/`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
PORT=3000
```

### Executar Servidor de Desenvolvimento

```bash
npm run dev
```

Servidor inicia em `http://localhost:3000`

## Documentação da API

### URL Base

```
http://localhost:3000
```

### Formato das Respostas

Todas as respostas da API seguem uma estrutura JSON consistente:

**Resposta de Sucesso:**

```json
{
  "success": true,
  "message": "Item criado com sucesso",
  "data": { ... }
}
```

**Resposta de Erro:**

```json
{
  "success": false,
  "message": "Nome é obrigatório"
}
```

### Internacionalização (i18n)

Todas as mensagens da API suportam inglês (`en`) e português (`pt-BR`).

**Requisição com parâmetro de idioma:**

```
GET /items?lang=pt-BR
```

**Resposta em português:**

```json
{
  "success": true,
  "message": "Itens recuperados com sucesso",
  "data": { "items": [...], "count": 1 }
}
```

Se nenhum idioma for especificado, a API usa inglês por padrão.

### Endpoints

#### 1. Criar Item

**Requisição:**

```
POST /items?lang=pt-BR
Content-Type: application/json

{
  "name": "Notebook",
  "quantity": 5
}
```

**Resposta de Sucesso (201 Created):**

```json
{
  "success": true,
  "message": "Item criado com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook",
    "quantity": 5,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T06:32:23.638Z"
  }
}
```

**Resposta de Erro (400 Bad Request):**

```json
{
  "success": false,
  "message": "Nome é obrigatório"
}
```

#### 2. Listar Todos os Itens

**Requisição:**

```
GET /items?lang=pt-BR
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "message": "Itens recuperados com sucesso",
  "data": {
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Notebook",
        "quantity": 5,
        "createdAt": "2026-03-27T06:32:23.638Z",
        "updatedAt": "2026-03-27T06:32:23.638Z"
      }
    ],
    "count": 1
  }
}
```

#### 3. Obter Item Único

**Requisição:**

```
GET /items/:id?lang=pt-BR
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "message": "Item recuperado com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook",
    "quantity": 5,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T06:32:23.638Z"
  }
}
```

**Resposta de Erro (404 Not Found):**

```json
{
  "success": false,
  "message": "Item não encontrado"
}
```

#### 4. Atualizar Item

**Requisição:**

```
PATCH /items/:id?lang=pt-BR
Content-Type: application/json

{
  "quantity": 10
}
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "message": "Item atualizado com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook",
    "quantity": 10,
    "createdAt": "2026-03-27T06:32:23.638Z",
    "updatedAt": "2026-03-27T10:00:00.000Z"
  }
}
```

#### 5. Deletar Item

**Requisição:**

```
DELETE /items/:id?lang=pt-BR
```

**Resposta de Sucesso (200 OK):**

```json
{
  "success": true,
  "message": "Item excluído com sucesso"
}
```

#### 6. Verificação de Saúde

**Requisição:**

```
GET /health
```

**Resposta (200 OK):**

```json
{
  "status": "ok"
}
```

## Modelo de Dados

```typescript
model Item {
  id        String   @id @default(uuid())
  name      String
  quantity  Int      // Deve ser >= 0
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Regras de Negócio

- **Validação de Quantidade**: Deve ser um inteiro não-negativo (>= 0)
- **Campos Obrigatórios**: Criar um item requer tanto `name` quanto `quantity`
- **Type Safety**: Nome deve ser uma string, quantidade deve ser um inteiro
- **Consistência**: Todas as respostas da API seguem o formato JSON padrão
- **Tratamento de Erros**: Todos os erros incluem mensagens localizadas e códigos HTTP apropriados
