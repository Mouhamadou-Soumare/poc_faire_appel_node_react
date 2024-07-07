import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Evenement from './Evenement.js';

const Presence = sequelize.define('Presence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estPresent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  evenementId: {
    type: DataTypes.INTEGER,
    references: {
      model: Evenement,
      key: 'id',
    },
  },
}, {
  tableName: 'presences',
  timestamps: false,
});

Presence.belongsTo(User, { foreignKey: 'userId' });
Presence.belongsTo(Evenement, { foreignKey: 'evenementId' });

export default Presence;
