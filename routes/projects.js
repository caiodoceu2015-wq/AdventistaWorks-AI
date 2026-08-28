const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Criar projeto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, subject, schoolYear } = req.body;
    const project = new Project({
      title,
      description,
      subject,
      schoolYear,
      student: req.user.id
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar projetos do aluno
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar projeto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;