// src/routes/index.js
import express from 'express';

const router = express.Router();

// Rota principal para verificar o status do servidor
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

export default router;
