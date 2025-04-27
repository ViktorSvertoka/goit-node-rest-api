import fs from 'node:fs/promises';
import path from 'node:path';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
  verifyUser,
  resendVerification,
} from '../services/authServices.js';

export const registerController = ctrlWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = await registerUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
});

export const loginController = ctrlWrapper(async (req, res) => {
  const { token, user } = await loginUser(req.body);

  res.json({ token, user });
});

export const logoutController = ctrlWrapper(async (req, res) => {
  const { id } = req.user;
  await logoutUser(id);

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

export const updateAvatarController = ctrlWrapper(async (req, res) => {
  if (!req.user) {
    throw HttpError(401, 'Not authorized');
  }

  if (!req.file) {
    throw HttpError(400, 'Avatar file is required');
  }

  const { id, avatarURL: oldAvatarURL } = req.user;

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
  await updateUserAvatar(id, { avatarURL: newAvatarURL });

  res.status(200).json({ avatarURL: newAvatarURL });
});

export const verifyController = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.params;
  await verifyUser(verificationCode);

  res.status(200).json({
    message: 'Email verification successfully',
  });
});

export const resendVerificationController = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, 'missing required field email');
  }

  await resendVerification(email);

  res.status(200).json({
    message: 'Verification email sent',
  });
});
