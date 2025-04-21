import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import { generateToken } from '../helpers/jwt.js';

export const findUser = query =>
  User.findOne({
    where: query,
  });

export const registerUser = async data => {
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

  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const loginUser = async data => {
  const { email, password } = data;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    email,
  };

  const token = generateToken(payload);

  await user.update({ token });

  return { token };
};

export const logoutUser = async id => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(404, 'User not found');
  }

  await user.update({ token: null });
};

export const updateUserAvatar = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await user.update(data);
  return user;
};
