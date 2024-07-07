import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Evenement = sequelize.define('Evenement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lieu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payant: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'evenements',
  timestamps: false,
});

export default Evenement;
