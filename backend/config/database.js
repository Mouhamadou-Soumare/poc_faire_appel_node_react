import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('association', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
});

export default sequelize;
