import { Contact } from "../models/contact.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const createContact = dbHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message)
    return res
      .status(400)
      .json(new ApiError(400, "Missing required fields"));

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  if (!contact)
    return res
      .status(400)
      .json(new ApiError(400, "Failed to create contact"));

  await contact.save();

  res.status(201).json(new ApiResponse(201, contact, "Contact created"));
});

export { createContact };
