import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const {
    username,
    password,
    nom,
    prenom,
    dateNaissance,
    adresse,
    email,
    telephone,
    categorieCours,
    niveau,
    categorieAge,
    role
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      nom,
      prenom,
      dateNaissance,
      adresse,
      email,
      telephone,
      categorieCours,
      niveau,
      categorieAge,
      role
    });

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});


export default router;
