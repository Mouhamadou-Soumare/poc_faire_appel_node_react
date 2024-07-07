import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Cotisation = sequelize.define('Cotisation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  datePaiement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'cotisations',
  timestamps: false,
});

Cotisation.belongsTo(User, { foreignKey: 'userId' });

export default Cotisation;
