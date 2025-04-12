import * as authServices from '../services/authServices.js';

import ctrlWrapper from '../decorators/ctrlWrapper.js';

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const loginController = async (req, res) => {
  const { token } = await authServices.loginUser(req.body);

  res.json({
    token,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.json({
    message: 'Logout successfully',
  });
};

const getCurrentController = (req, res) => {
  const { email, username } = req.user;

  res.json({
    email,
    username,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
};
