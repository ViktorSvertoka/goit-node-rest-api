import * as authServices from '../services/authServices.js';

import ctrlWrapper from '../decorators/ctrlWrapper.js';

const signupController = async (req, res) => {
  const newUser = await authServices.signupUser(req.body);

  res.status(201).json({
    username: email.username,
    email: newUser.email,
  });
};

export default {
  signupController: ctrlWrapper(signupController),
};
