import { Sequelize } from 'sequelize';
import config from '../config.js';
import UserModel from './user.js';

export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: false,
  dialectOptions: config.db.ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
});

export const User = UserModel(sequelize);

export default {
  sequelize,
  User
};
