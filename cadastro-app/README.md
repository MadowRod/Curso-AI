# Cadastro App — Full Stack CRUD

Aplicação full stack de cadastro de pessoas com **React** (frontend) e **Spring Boot** (backend).

## Estrutura do projeto

```
cadastro-app/
├── backend/          # API REST Spring Boot
│   └── src/main/java/com/example/cadastro/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       └── config/
└── frontend/         # React + Vite
    └── src/
        ├── api/
        ├── components/
        └── pages/
```

## Funcionalidades

- Listagem de registros
- Cadastro
- Edição
- Busca por nome ou e-mail
- Exclusão

## Pré-requisitos

- Java 17+
- Node.js 18+
- Maven (ou IntelliJ IDEA com suporte Maven)

## Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pessoas` | Lista todas as pessoas |
| GET | `/api/pessoas?busca=termo` | Busca por nome ou e-mail |
| GET | `/api/pessoas/{id}` | Busca por ID |
| POST | `/api/pessoas` | Cria um registro |
| PUT | `/api/pessoas/{id}` | Atualiza um registro |
| DELETE | `/api/pessoas/{id}` | Exclui um registro |

Banco de dados: **H2 em memória** (console em `http://localhost:8080/h2-console`).

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Tecnologias

**Frontend:** React, React Router, Axios, Vite, useState, useEffect

**Backend:** Spring Boot, Spring Data JPA, H2, arquitetura em camadas (Controller, Service, Repository, Entity)
