import express from 'express';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateStatusContactController,
} from '../controllers/contactsControllers.js';

import validateBody from '../decorators/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';

import isEmptyBody from '../middlewares/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', getContactsController);

contactsRouter.get('/:id', getContactByIdController);

// upload.fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'subAvatars', maxCount: 2 },
// ]);

// upload.array('avatar', 8);

contactsRouter.post(
  '/',
  upload.single('avatar'),
  isEmptyBody,
  validateBody(createContactSchema),
  addContactController
);

contactsRouter.put(
  '/:id',
  isEmptyBody,
  validateBody(updateContactSchema),
  updateContactController
);

contactsRouter.delete('/:id', deleteContactController);

contactsRouter.patch(
  '/:id/favorite',
  validateBody(updateFavoriteSchema),
  updateStatusContactController
);

export default contactsRouter;
