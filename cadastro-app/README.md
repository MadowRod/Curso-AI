🚗 Sistema de Concessionária Full Stack

Sistema full stack desenvolvido com React + Spring Boot, com autenticação JWT, CRUD completo de veículos e integração opcional com API FIPE para sugestão de preços.

📌 Visão Geral

A aplicação simula um sistema de gerenciamento de veículos de uma concessionária, permitindo:

Cadastro de usuários com autenticação
Login seguro com JWT
CRUD completo de veículos
Busca e filtros dinâmicos
Proteção de rotas no frontend e backend
Sugestão de preço via API FIPE (recurso auxiliar)

🧱 Tecnologias Utilizadas
Backend
Java 17+
Spring Boot
Spring Security + JWT
Spring Data JPA
H2 Database
Maven
Frontend
React
Axios
React Router DOM
Context API / Hooks (useState, useEffect)

🏗️ Arquitetura do Backend
controller/   → VeiculoController, AuthController  
service/      → VeiculoService, AuthService  
repository/   → VeiculoRepository, UsuarioRepository  
entity/       → Veiculo, Usuario, Role  
dto/          → Requests e Responses  
security/     → JWT, filtros e SecurityConfig  
exception/    → GlobalExceptionHandler  
🔐 Autenticação

O sistema utiliza JWT (JSON Web Token) para proteção das rotas.

Usuário padrão:

📧 Email: admin@admin.com
🔑 Senha: admin123

Requisição autenticada:

Authorization: Bearer <token>
📡 Endpoints da API
🔐 Autenticação

Método	Rota	Descrição

POST	/auth/register	Cadastro de usuário
POST	/auth/login	Login (retorna JWT)

🚗 Veículos (protegido)

Método	Rota	Descrição
GET	/veiculos	Listar veículos (com busca ?busca=)
GET	/veiculos/{id}	Buscar veículo por ID
POST	/veiculos	Criar veículo
PUT	/veiculos/{id}	Atualizar veículo
DELETE	/veiculos/{id}	Excluir veículo

🎨 Frontend (React)

📄 Páginas

/login → Login do usuário
/register → Cadastro de usuário
/ → Listagem de veículos (CRUD + busca)
/cadastro → Criar veículo
/editar/:id → Editar veículo
/veiculos/:id → Detalhes do veículo

🔗 Integração

Axios configurado para http://localhost:8080
Token JWT armazenado e injetado automaticamente
Rotas protegidas com ProtectedRoute
Atualização automática da lista após CRUD

📊 Banco de Dados

H2 Database (em memória)
Dados persistidos durante execução
Estrutura baseada em entidades JPA

⚙️ FIPE (Recurso Auxiliar)

A API FIPE é usada apenas como suporte:

Sugestão de preço no formulário
Auxílio na seleção de marca/modelo/ano

❗ Não é usada como fonte principal de dados.

▶️ Como Executar o Projeto
🔧 Backend
cd backend
mvn spring-boot:run
💻 Frontend
cd frontend
npm install
npm run dev
🌐 Acesso

Abra no navegador:

http://localhost:5173
🔄 Fluxo da Aplicação
React Frontend
     ↓ Axios + JWT
Spring Boot API
     ↓
H2 Database
     ↓ (auxiliar)
API FIPE
✨ Funcionalidades

✔ Autenticação JWT
✔ Cadastro de usuários
✔ CRUD completo de veículos
✔ Busca e filtros
✔ Rotas protegidas
✔ Integração frontend + backend
✔ Sugestão de preço via FIPE
✔ Arquitetura em camadas

📌 Observação

O sistema foi projetado seguindo boas práticas de arquitetura full stack, separação de responsabilidades e segurança com autenticação JWT.
