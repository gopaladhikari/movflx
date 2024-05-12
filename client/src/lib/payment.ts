"use server";

import { instance } from "@/config/axios";
import { ApiError } from "@/types/axios-response";
import { CreateEsewaPaymentResponse, KhaltiData } from "@/types/payment";
import { cookies } from "next/headers";

const createEsewaPayment = async (
	plan: string,
	email: string | undefined
) => {
	try {
		const token = cookies().get("token")?.value;

		instance.defaults.headers.common.Authorization = `Bearer ${token}`;
		const res = await instance.post<CreateEsewaPaymentResponse>(
			`/payment/create-esewa-payment/${plan}`,
			{ email }
		);

		return res.data;
	} catch (error) {
		const err = error as ApiError;
		return err.response?.data;
	}
};

const createKhaltiPayment = async (
	plan: string,
	email: string | undefined,
	name: string
) => {
	try {
		const token = cookies().get("token")?.value;

		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

		const res = await instance.post<KhaltiData>(
			`/payment/create-khalti-payment/${plan}`,
			{ email, name }
		);

		return { data: res.data.data, ok: true };
	} catch (error) {
		const err = error as ApiError;

		const msg =
			typeof err.response?.data === "string"
				? err.response?.data
				: err.response?.data.message;

		return {
			error: msg,
			ok: false,
		};
	}
};

export { createEsewaPayment, createKhaltiPayment };
