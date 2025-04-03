import express from 'express';
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);

contactsRouter.delete('/:id', deleteContact);

export default contactsRouter;
