import { Sequelize } from 'sequelize';
import config from '../config.js';
import UserModel from './user.js';
import UserBlockAuditModel from './userBlockAudit.js';

export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: false,
  dialectOptions: config.db.ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {}
});

export const User = UserModel(sequelize);
export const UserBlockAudit = UserBlockAuditModel(sequelize);

// Associations
UserBlockAudit.belongsTo(User, { foreignKey: 'actingUserId', as: 'actor' });
User.hasMany(UserBlockAudit, { foreignKey: 'userId', as: 'blockAudits' });

export default {
  sequelize,
  User,
  UserBlockAudit
};
