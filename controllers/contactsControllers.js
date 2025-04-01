import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();

  res.json(data);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

export const createContact = async (req, res) => {
  const data = await contactsService.addContact(req.body);

  res.status(201).json(data);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.updateContacts(id, req.body);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};
