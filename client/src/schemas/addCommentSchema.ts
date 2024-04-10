import z from "zod";

export const textSchema = z.object({
  text: z.string().min(1, "Text is required").max(1000),
});

export type TTextSchema = z.infer<typeof textSchema>;
