"use server";

import { instance } from "@/config/axios";
import { TContactSchema } from "@/schemas/contactSchema";
import { IContactResponse } from "@/types/contact";

const createContact = async (data: TContactSchema) => {
  try {
    const res = await instance.post<IContactResponse>(
      "/contacts/create-contact",
      data
    );

    return res.data;
  } catch (error) {
    return null;
  }
};

export { createContact };
