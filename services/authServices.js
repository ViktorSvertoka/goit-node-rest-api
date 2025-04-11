import bcrypt from 'bcrypt';

import User from '../db/models/User.js';

import HttpError from '../helpers/HttpError.js';

export const signupUser = async data => {
  const { email, password } = data;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return User.create({ ...data, password: hashPassword });
};

export const signinUser = async data => {
  const { email, password } = data;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw HttpError(401, 'Email or password invalid...');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid...');
  }

  const token = 'fffd';

  return { token };
};
