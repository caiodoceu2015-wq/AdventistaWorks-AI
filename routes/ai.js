const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Obter orientação da IA sobre um tópico
router.post('/guidance', authMiddleware, async (req, res) => {
  try {
    const { subject, topic, schoolYear } = req.body;

    const prompt = `Você é um orientador educacional especializado em auxiliar alunos do ${schoolYear} da Escola Adventista. 
    Disciplina: ${subject}
    Tópico: ${topic}
    
    Forneça uma orientação clara, concisa e educativa sobre este tópico. Inclua:
    1. Explicação principal
    2. 3-4 pontos-chave
    3. Dicas de pesquisa
    4. Exemplos práticos`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ guidance: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;