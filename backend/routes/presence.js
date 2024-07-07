import { Router } from 'express';
import Presence from '../models/Presence.js';
import User from '../models/User.js';
import Evenement from '../models/Evenement.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, evenementId, estPresent } = req.body;
  try {
    const presence = await Presence.create({
      userId,
      evenementId,
      estPresent,
      date: new Date(),
    });
    res.status(201).json(presence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/evenements', async (req, res) => {
  try {
    const evenements = await Evenement.findAll();
    res.json(evenements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:evenementId', async (req, res) => {
  const { evenementId } = req.params;
  try {
    const presences = await Presence.findAll({
      where: { evenementId },
      include: [User],
    });
    res.json(presences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:presenceId', async (req, res) => {
  const { presenceId } = req.params;
  const { estPresent } = req.body;
  try {
    const presence = await Presence.findByPk(presenceId);
    if (presence) {
      presence.estPresent = estPresent;
      await presence.save();
      res.json(presence);
    } else {
      res.status(404).json({ error: 'Presence not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
