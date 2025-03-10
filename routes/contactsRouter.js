import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { validateBody, validateBodyWithPathId } from "../helpers/validateBody.js";

import {createContactSchema, updateContactSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authMiddleware, getAllContacts);

contactsRouter.get("/:id", authMiddleware, getOneContact);

contactsRouter.delete("/:id", authMiddleware, deleteContact);

contactsRouter.post("/", authMiddleware, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", authMiddleware, validateBodyWithPathId(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", authMiddleware, validateBodyWithPathId(updateFavoriteSchema), updateFavorite);

export default contactsRouter;
