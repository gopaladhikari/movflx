import { Router } from "express";
import { createContact } from "../controllers/contact.controller";

const contactRouter = Router();

contactRouter.route("/create-contact").post(createContact);

export { contactRouter };
