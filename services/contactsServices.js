import Contact from '../db/models/Contact.js';

export const getContacts = query =>
  Contact.findAll({
    where: query,
  });

export const getContactById = id => Contact.findByPk(id);

export const getContact = query =>
  Contact.findOne({
    where: query,
  });

export const addContact = data => Contact.create(data);

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const deleteContact = query =>
  Contact.destroy({
    where: query,
  });

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update({ favorite }, { returning: true });
};
