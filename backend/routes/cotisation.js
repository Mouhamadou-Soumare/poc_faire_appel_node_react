// routes/cotisation.js
import { Router } from 'express';
import Cotisation from '../models/Cotisation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticateToken, async (req, res) => {
  const { montant, datePaiement, statut } = req.body;
  const userId = req.user.id; // Assurez-vous que l'ID utilisateur est récupéré correctement
  try {
    const cotisation = await Cotisation.create({
      montant,
      datePaiement,
      statut,
      userId,
      expirationDate: new Date(new Date().getFullYear() + 1, 8, 1) // 1er septembre de l'année prochaine
    });
    res.status(201).json(cotisation);
  } catch (error) {
    console.error('Erreur serveur:', error); // Ajoutez cette ligne pour les logs
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const cotisations = await Cotisation.findAll({ where: { userId } });
    res.json(cotisations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
