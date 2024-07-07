// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import presenceRoutes from './routes/presence.js';
import authRoutes from './routes/auth.js';
import cotisationRoutes from './routes/cotisation.js';
import sequelize from './config/database.js';
import { authenticateToken } from './middleware/auth.js';
import Evenement from './models/Evenement.js';
import Presence from './models/Presence.js';
import User from './models/User.js';
import Cotisation from './models/Cotisation.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/presences', authenticateToken, presenceRoutes);
app.use('/cotisations', authenticateToken, cotisationRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const initializeData = async () => {
  const hashedPassword = await bcrypt.hash('password', 10);

  await User.bulkCreate([
    { username: 'choeurtis', password: hashedPassword, nom: 'Choeurtis', prenom: 'Tchounga', dateNaissance: '2000-01-01', adresse: '12 rue de Montreuil, Montreuil', email: 'choeurtis.tchounga@test.com', telephone: '1234567890', categorieCours: 'classique', niveau: 'intermédiaire', categorieAge: 'adulte', role: 'admin' },
    { username: 'mouha', password: hashedPassword, nom: 'Mouha', prenom: 'Soum', dateNaissance: '2000-02-01', adresse: '56 rue de la paix, Toulouse', email: 'mouha.soum@tuconnais.com', telephone: '0987654321', categorieCours: 'hip-hop', niveau: 'débutant', categorieAge: 'adulte', role: 'adherent' },
    { username: 'jane', password: hashedPassword, nom: 'Jane', prenom: 'Doe', dateNaissance: '2001-03-15', adresse: '78 rue des Fleurs, Paris', email: 'jane.doe@example.com', telephone: '1234561234', categorieCours: 'contemporain', niveau: 'avancé', categorieAge: 'adolescent', role: 'representant_legal' },
  ]);

  await Evenement.bulkCreate([
    { nom: 'Stage Ados', date: '2024-07-10', lieu: 'Salle A', payant: true },
    { nom: 'Stage Classique', date: '2024-08-01', lieu: 'Salle B', payant: true },
  ]);

  const currentYear = new Date().getFullYear();
  const cotisationDate = new Date();
  const expirationDate = new Date(currentYear + 1, 8, 1);

  await Cotisation.bulkCreate([
    { userId: 1, montant: 200, datePaiement: cotisationDate, expirationDate, statut: 'payé' },
    { userId: 2, montant: 200, datePaiement: cotisationDate, expirationDate, statut: 'payé' },
    { userId: 3, montant: 200, datePaiement: cotisationDate, expirationDate, statut: 'payé' },
  ]);

  await Presence.bulkCreate([
    { userId: 1, evenementId: 1, estPresent: true, date: new Date() },
    { userId: 2, evenementId: 1, estPresent: false, date: new Date() },
    { userId: 3, evenementId: 2, estPresent: true, date: new Date() },
  ]);
};


app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true }); 
    await initializeData();
    console.log('Database synced successfully');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
});
