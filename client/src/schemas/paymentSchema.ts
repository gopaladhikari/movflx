import z from "zod";

export const PaymentSchema = z.object({
	name: z.enum(["Esewa", "Khalti"], {
		required_error: "Payment method is required",
	}),
});

export type PaymentType = z.infer<typeof PaymentSchema>;
