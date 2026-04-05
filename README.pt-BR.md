# Sistema de Inventário Full-Stack

🇧🇷 **Português** | 🇺🇸 [English](README.md)

Um dashboard especializado de gestão de inventário construído com uma arquitetura full-stack profissional e type-safe. Este projeto demonstra o uso de **React (Vite)** no frontend e **Node.js (Express)** no backend, apresentando uma estética dark-mode personalizada e suporte robusto para múltiplos idiomas.

---

## Funcionalidades

- **Dashboard Interativo**: Interface moderna com estatísticas em tempo real (Total de Itens, Categorias, Estoque Baixo).
- **Suporte Multi-idioma (i18n)**: Interface totalmente traduzida e campos de banco de dados especializados para conteúdo localizado (Inglês e Português).
- **Gestão de Inventário Avançada**: 
    - Operações CRUD completas com atualizações instantâneas na interface.
    - Rastreamento especializado de SKUs.
    - Indicadores automáticos de Estoque Baixo.
- **Backend Robusto**:
    - API RESTful com respostas JSON padronizadas.
    - Filtragem avançada, busca e paginação.
    - Persistência type-safe usando **Prisma ORM** e **PostgreSQL**.

---

## Stack Tecnológico

### Frontend
- **React 18** + **Vite** (para HMR ultra-rápido).
- **TypeScript** para segurança de tipos de ponta a ponta.
- **CSS Personalizado** (Vanilla) com foco em estética moderna glassmorphism e dark-mode.
- **Hooks do React** para gestão de estado sofisticada.

### Backend
- **Node.js** + **Express**.
- **Prisma ORM** (Tipagem no lado do cliente).
- **Banco de Dados PostgreSQL**.
- **Jest/Supertest** para testes de integração abrangentes.

---

## Início Rápido

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL (rodando localmente ou uma string de conexão remota)

### 1. Configuração do Banco de Dados
1. Crie um banco de dados no PostgreSQL (ex: `inventory_db`).
2. Atualize o arquivo `backend/.env` com a sua `DATABASE_URL`.

### 2. Instalação e Configuração do Backend
```bash
cd backend
npm install

# Execute as migrações para configurar o schema
npx prisma migrate dev --name init

# Inicie o servidor de desenvolvimento
npm run dev
```
*A API estará disponível em `http://localhost:3000`.*

### 3. Instalação e Configuração do Frontend
```bash
cd frontend
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
*O dashboard estará disponível em `http://localhost:5173`.*

---

## Docker Quick Start (Recomendado)

A maneira mais fácil de rodar todo o projeto (Banco de Dados, API e Dashboard) é através do Docker.

### 1. Iniciar o Projeto
```bash
docker-compose up --build
```
- **Dashboard**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

### 2. Rodar Testes Automatizados no Docker
```bash
docker-compose run --rm backend-test
```
*Isso inicia um banco de dados de teste dedicado, executa a suíte Jest e limpa tudo após a conclusão.*

---

## Referência da API

Todas as requisições seguem a estrutura: `http://localhost:3000/items?lang=pt-BR`

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/items` | Lista itens (suporta `page`, `limit`, `search`, `category`) |
| `POST` | `/items` | Cria um novo item |
| `GET` | `/items/:id` | Obtém detalhes de um único item |
| `PATCH` | `/items/:id` | Atualiza um item existente |
| `DELETE` | `/items/:id` | Remove um item |
| `GET` | `/items/low-stock` | Obtém itens atualmente abaixo do limite |

---

## Testes

O backend inclui uma suíte de testes abrangente cobrindo todas as regras de negócio (validação de SKU, restrições de quantidade, i18n).

```bash
cd backend
npm test
```

---

## Estrutura do Projeto

```text
├── backend/            # Servidor Express e schema Prisma
│   ├── prisma/         # Migrações do banco de dados
│   ├── src/
│   │   ├── controllers/# Handlers de requisição
│   │   ├── services/   # Lógica de negócio (acesso ao banco)
│   │   └── i18n/       # JSONs de localização
└── frontend/           # App Vite + React
    ├── src/
    │   ├── api/        # Cliente Axios/Fetch
    │   ├── components/ # Componentes de UI reutilizáveis
    │   └── context/    # Estado de idioma/UI
```

---

## 🇧🇷 Internacionalização (i18n)
Este sistema é verdadeiramente bilíngue. Os usuários podem alternar toda a interface entre Inglês e Português. Diferente de simples traduções de interface, o banco de dados armazena ativamente o conteúdo em ambos os idiomas:
- `name` / `namePT`
- `category` / `categoryPT`
- `description` / `descriptionPT`
