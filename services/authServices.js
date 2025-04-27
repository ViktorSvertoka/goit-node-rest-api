import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import { generateToken } from '../helpers/jwt.js';
import sendEmail from '../helpers/sendEmail.js';

const { APP_DOMAIN } = process.env;

const createVerifyEmail = (email, verificationToken) => ({
  to: email,
  subject: 'Verify email',
  html: `<a href="${APP_DOMAIN}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
});

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
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = createVerifyEmail(email, verificationToken);

  await sendEmail(verifyEmail);

  return newUser;
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

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
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

export const verifyUser = async verificationToken => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await user.update({ verificationToken: null, verify: true });
};

export const resendVerification = async email => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, 'Email not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = createVerifyEmail(email, user.verificationToken);

  await sendEmail(verifyEmail);
};
