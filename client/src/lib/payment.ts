"use server";

import { instance } from "@/config/axios";
import { ApiError } from "@/types/axios-response";
import { CreateEsewaPaymentResponse } from "@/types/payment";

const createEsewaPayment = async (
	plan: string,
	email: string | undefined
) => {
	try {
		const res = await instance.post<CreateEsewaPaymentResponse>(
			`/payment/create-esewa-payment/${plan}`,
			{
				email,
			}
		);
		return res.data;
	} catch (error) {
		const err = error as ApiError;
		return err.response?.data;
	}
};

export { createEsewaPayment };
