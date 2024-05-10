import { Success } from "./axios-response";

interface Pricing {
	_id: string;
	id: number;
	plan: string;
	price: number;
	videoQuality: string;
	videoResolution: string;
	screens: number;
}

interface Payment {
	id: number;
	name: string;
	img: string;
}

interface IPricingPlan extends Success {
	data: Pricing[];
}

interface IPaymentOptions extends Success {
	data: Payment[];
}

export { IPricingPlan, IPaymentOptions, Payment };
