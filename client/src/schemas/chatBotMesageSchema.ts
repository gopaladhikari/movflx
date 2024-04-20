import { z } from "zod";

export const chatBotMessageSchema = z.object({
	message: z.string().min(1, "Message is required"),
});

export type TChatBotMessageSchema = z.infer<typeof chatBotMessageSchema>;
