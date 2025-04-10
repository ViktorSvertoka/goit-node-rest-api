import User from '../db/models/User.js';

import HttpError from '../helpers/HttpError.js';

export const signupUser = async data => {
  const { email } = data;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }
  return User.create(data);
};
