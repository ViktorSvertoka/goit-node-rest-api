import fs from 'node:fs/promises';
import path from 'node:path';
import * as authServices from '../services/authServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

export const registerController = ctrlWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = await authServices.registerUser(
    req.body
  );

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
});

export const loginController = ctrlWrapper(async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.json({ token, user });
});

export const logoutController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.status(204).json({
    message: 'Logout successfully',
  });
});

export const getCurrentController = ctrlWrapper((req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

export const updateAvatar = ctrlWrapper(async (req, res) => {
  const { id, avatarURL: oldAvatarURL } = req.user;

  if (!req.file) {
    throw HttpError(400, 'Avatar file is required');
  }

  const { path: tempPath, originalname } = req.file;
  const timestamp = Date.now();
  const fileName = `${id}_${timestamp}_${originalname}`;

  const avatarsDir = path.resolve('public', 'avatars');
  const finalPath = path.join(avatarsDir, fileName);

  if (oldAvatarURL) {
    const oldFileName = path.basename(oldAvatarURL);
    if (oldFileName !== fileName) {
      const oldFilePath = path.join(avatarsDir, oldFileName);
      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        console.log(`Failed to delete old avatar: ${error.message}`);
      }
    }
  }

  await fs.rename(tempPath, finalPath);

  const newAvatarURL = `/avatars/${fileName}`;
  await authServices.updateUser(id, { avatarURL: newAvatarURL });

  res.status(200).json({ avatarURL: newAvatarURL });
});
