import z from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().optional(),
});

export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
