import { DataTypes } from 'sequelize';

import { sequelize } from '../Sequelize.js';

import { emailRegexp } from '../../constants/regexp.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRegexp,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync();

export default User;
