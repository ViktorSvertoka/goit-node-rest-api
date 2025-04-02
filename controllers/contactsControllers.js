import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

export const getAllContacts = ctrlWrapper(async (_, res) => {
  const data = await contactsService.listContacts();
  res.json(data);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.json(data);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const data = await contactsService.addContact(req.body);
  res.status(201).json(data);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.updateContacts(id, req.body);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.json(data);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);

  if (!data) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json(data);
});
