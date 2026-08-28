require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB conectado com sucesso');
}).catch(err => {
  console.error('❌ Erro ao conectar MongoDB:', err);
});

// Importar rotas
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const subjectRoutes = require('./routes/subjects');
const aiRoutes = require('./routes/ai');
const uploadRoutes = require('./routes/upload');
const facialRoutes = require('./routes/facialRecognition');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/facial', facialRoutes);

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Servidor rodando', timestamp: new Date() });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌍 Acesse: http://localhost:${PORT}`);
});