import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.findAll();

export const getContactById = id => Contact.findByPk(id);

export const addContact = data => Contact.create(data);

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const deleteContact = id =>
  Contact.destroy({
    where: {
      id,
    },
  });

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update({ favorite }, { returning: true });
};
