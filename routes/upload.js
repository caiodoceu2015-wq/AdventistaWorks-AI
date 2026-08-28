const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(fileUpload());

// Upload de imagem com suporte a PNG transparente
router.post('/image', authMiddleware, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const image = req.files.image;
    const fileName = `${Date.now()}-${image.name}`;
    const uploadPath = path.join(__dirname, '../uploads', fileName);

    // Criar diretório se não existir
    if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
    }

    await image.mv(uploadPath);

    // Processar imagem (manter transparência se PNG)
    const metadata = await sharp(uploadPath).metadata();
    const hasTransparency = metadata.hasAlpha || metadata.format === 'png';

    res.json({
      url: `/uploads/${fileName}`,
      hasTransparency,
      fileName
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;