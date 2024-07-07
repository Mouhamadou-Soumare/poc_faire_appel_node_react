// config/database.test.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', {
  logging: false, // Disable logging for testing
});

export default sequelize;

// Test file
describe('Database Connection', () => {
  it('should connect to the database', async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  });
});
