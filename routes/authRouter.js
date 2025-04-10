import express from 'express';

import validateBody from '../helpers/validateBody.js';

import { authSignupSchema, authSigninSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/signup', validateBody(authSignupSchema));

export default authRouter;
