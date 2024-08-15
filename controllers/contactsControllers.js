import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page, limit } = req.query;
  const result = await contactsService.getContacts({ owner }, { page, limit });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.getContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.updateContact({ id, owner }, req.body);
  if (!result || result[0] === 0) {
    throw HttpError(404);
  }
  const resultUpdate = await contactsService.getContact({ id, owner });
  res.json(resultUpdate);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Contact successfully deleted" });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
