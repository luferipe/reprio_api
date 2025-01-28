// src/routes/auth.js
import express from 'express';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  console.log('Tentativa de autenticação com:', { email, password });

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const token = await userCredential.user.getIdToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error.code, error.message);
    res.status(401).json({ error: error.message });
  }
});


export default router;
