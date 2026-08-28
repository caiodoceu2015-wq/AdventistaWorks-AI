const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

// Listar todas as matérias
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar matérias por ano escolar
router.get('/year/:schoolYear', async (req, res) => {
  try {
    const subjects = await Subject.find({ schoolYears: req.params.schoolYear });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;