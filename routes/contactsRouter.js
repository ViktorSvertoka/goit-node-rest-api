import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  updateStatusContactController,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';

import isEmptyBody from '../middlewares/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getContactsController);

contactsRouter.get('/:id', getContactByIdController);

contactsRouter.post(
  '/',
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
