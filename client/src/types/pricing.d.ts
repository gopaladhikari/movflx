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

interface PurchaseInfo {
	data: {
		_id: string;
		user_email: string;
		pidx: "EZEgVNnC6sMsHAS5JJpVxY";
		purchasePlan: "standard";
		amount: number;
		paymentMethod: string;
		status: string;
		paymentDate: string;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
		transactionId: string;
	};
}

export { IPricingPlan, IPaymentOptions, Payment, PurchaseInfo };
