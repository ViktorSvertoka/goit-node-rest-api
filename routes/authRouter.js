import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  updateAvatar,
} from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import { authRegisterSchema, authLoginSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateBody(authRegisterSchema),
  registerController
);

authRouter.post('/login', validateBody(authLoginSchema), loginController);

authRouter.post('/logout', authenticate, logoutController);

authRouter.get('/current', authenticate, getCurrentController);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

export default authRouter;
