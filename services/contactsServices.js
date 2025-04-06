import User from '../db/models/User.js';

export const getContacts = () => User.findAll();

export const getContactById = id => User.findByPk(id);

export const addContact = data => User.create(data);

export const updateContact = async (id, data) => {
  const user = await getContactById(id);
  if (!user) return null;

  return user.update(data, {
    returning: true,
  });
};

export const deleteContact = id =>
  User.destroy({
    where: {
      id,
    },
  });

export const updateStatusContact = async (id, { favorite }) => {
  const user = await getContactById(id);
  if (!user) return null;

  return user.update({ favorite }, { returning: true });
};
