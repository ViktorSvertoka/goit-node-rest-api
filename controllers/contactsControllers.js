import * as contactsService from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';

import ctrlWrapper from '../decorators/ctrlWrapper.js';

export const getContactsController = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.getContacts({ owner });
  res.json(data);
});

export const getContactByIdController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.getContact({ id, owner });
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
});

export const addContactController = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(data);
});

export const updateContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.updateContact({ id, owner }, req.body);
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
});

export const deleteContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.deleteContact({ id, owner });

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({
    message: 'Contact successfully deleted',
  });
});

export const updateStatusContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.updateStatusContact(id, req.body);
  if (!data) {
    throw HttpError(404, 'Not found');
  }
  res.json(data);
});
