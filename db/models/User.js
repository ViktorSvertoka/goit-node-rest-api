import { DataTypes } from 'sequelize';
import { sequelize } from '../Sequelize.js';
import { emailRegexp } from '../../constants/regexp.js';

const User = sequelize.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: emailRegexp,
      },
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ['starter', 'pro', 'business'],
      defaultValue: 'starter',
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// User.sync({ alter: true });

export default User;
