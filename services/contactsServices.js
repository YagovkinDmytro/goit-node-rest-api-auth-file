import Contact from "../db/models/Contact.js";

export const getContacts = (query, { page = 1, limit = 20 }) => {
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return Contact.findAll({
    where: query,
    offset: offset,
    limit: normalizedLimit,
  });
};

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const addContact = (data) => Contact.create(data);

export const updateContact = (query, data) =>
  Contact.update(data, {
    where: query,
  });

export const removeContact = (query) =>
  Contact.destroy({
    where: query,
  });
