const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Treinar rosto do professor
router.post('/train', authMiddleware, async (req, res) => {
  try {
    const { descriptors } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 'facialData.descriptors': descriptors, 'facialData.trained': true, 'facialData.lastUpdate': new Date() },
      { new: true }
    );
    res.json({ message: 'Rosto treinado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reconhecer rosto para login do professor
router.post('/recognize', async (req, res) => {
  try {
    const { descriptors } = req.body;
    const users = await User.find({ role: 'teacher', 'facialData.trained': true });
    
    // Comparar descritores faciais
    let bestMatch = null;
    let bestDistance = Infinity;

    for (let user of users) {
      const distance = calculateEuclideanDistance(descriptors, user.facialData.descriptors);
      if (distance < bestDistance && distance < 0.6) {
        bestDistance = distance;
        bestMatch = user;
      }
    }

    if (bestMatch) {
      res.json({ success: true, user: bestMatch });
    } else {
      res.status(401).json({ success: false, message: 'Rosto não reconhecido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function calculateEuclideanDistance(arr1, arr2) {
  return Math.sqrt(arr1.reduce((sum, val, i) => sum + Math.pow(val - arr2[i], 2), 0));
}

module.exports = router;