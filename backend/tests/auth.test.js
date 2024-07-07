import request from 'supertest';
import app from '../index.js'; // Correct path to your app
import sequelize from '../config/database.test.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.create({
      username: 'testuser',
      password: await bcrypt.hash('password', 10),
      nom: 'Test',
      prenom: 'User',
      dateNaissance: '2000-01-01',
      adresse: '123 Main St',
      email: 'testuser@example.com',
      telephone: '1234567890',
      categorieCours: 'classique',
      niveau: 'intermédiaire',
      categorieAge: 'adulte',
      role: 'admin',
    });
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'newuser',
        password: 'password',
        nom: 'New',
        prenom: 'User',
        dateNaissance: '2000-01-01',
        adresse: '123 Main St',
        email: 'newuser@example.com',
        telephone: '1234567890',
        categorieCours: 'classique',
        niveau: 'intermédiaire',
        categorieAge: 'adulte',
        role: 'adherent',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
