import { Success } from "./axios-response";

interface CreateEsewaPaymentResponse extends Success {
	data: {
		amount: number;
		failure_url: string;
		product_delivery_charge: string;
		product_service_charge: string;
		product_code: string;
		signature: string;
		signed_field_names: string;
		success_url: string;
		tax_amount: number;
		total_amount: number;
		transaction_uuid: number;
	};
}

export interface KhaltiData extends Success {
	data: {
		pidx: string;
		payment_url: string;
		expires_at: Date;
		expires_in: number;
	};
}
