# 🎓 SchoolWorks AI - Backend

**Servidor backend para plataforma de desenvolvimento de trabalhos escolares com IA**

## 🚀 Instalação

```bash
npm install
cp .env.example .env
# Configure suas variáveis de ambiente
npm run dev
```

## 📋 Rotas Disponíveis

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Projetos
- `GET /api/projects` - Listar projetos do aluno
- `POST /api/projects` - Criar novo projeto
- `PUT /api/projects/:id` - Atualizar projeto

### Matérias
- `GET /api/subjects` - Listar todas as matérias
- `GET /api/subjects/year/:schoolYear` - Matérias por ano

### IA
- `POST /api/ai/guidance` - Obter orientação da IA

### Upload
- `POST /api/upload/image` - Fazer upload de imagem

### Reconhecimento Facial
- `POST /api/facial/train` - Treinar rosto do professor
- `POST /api/facial/recognize` - Reconhecer rosto

## 🔐 Variáveis de Ambiente

```
MONGODB_URI - URL do banco de dados MongoDB
JWT_SECRET - Chave secreta para tokens JWT
OPENAI_API_KEY - Chave da API OpenAI
PORT - Porta do servidor (padrão: 5000)
```

## 🛠️ Tecnologias

- Express.js
- MongoDB
- JWT
- OpenAI API
- Face-api.js
