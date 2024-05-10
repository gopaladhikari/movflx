import { instance } from "@/config/axios";
import { ApiError } from "@/types/axios-response";
import { IPaymentOptions, IPricingPlan } from "@/types/pricing";

const getPricingPlans = async () => {
	try {
		const res = await instance.get<IPricingPlan>("/pricing/get-pricing-plans");
		return { data: res.data.data, ok: true };
	} catch (error) {
		const message = (error as ApiError).response?.data.message;
		return { error: message, ok: false };
	}
};

const getPaymentOptions = async () => {
	try {
		const res = await instance.get<IPaymentOptions>(
			"/pricing/get-payment-options"
		);
		return { data: res.data.data, ok: true };
	} catch (error) {
		const message = (error as ApiError).response?.data.message;
		return { error: message, ok: false };
	}
};

export { getPricingPlans, getPaymentOptions };
