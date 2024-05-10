import { Success } from "./axios-response";

interface Theater {
	location: {
		address: {
			street1: string;
			city: string;
			state: string;
			zipcode: string;
		};
		geo: {
			type: string;
			coordinates: number[];
		};
	};
	_id: string;
	theaterId: number;
}

export interface GetAllTheater extends Success {
	data: Theater[];
}
