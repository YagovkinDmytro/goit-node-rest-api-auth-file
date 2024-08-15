import { Router } from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const createMiddleware = validateBody(createContactSchema);
const updateMiddleware = validateBody(updateContactSchema);
const updateStatusContactMiddleware = validateBody(updateStatusContactSchema);

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.post("/", createMiddleware, contactsControllers.createContact);

contactsRouter.put("/:id", updateMiddleware, contactsControllers.updateContact);

contactsRouter.patch(
  "/:id/favorite",
  updateStatusContactMiddleware,
  contactsControllers.updateContact
);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

export default contactsRouter;
