import { Spinner } from "@nextui-org/react";

export default function loading() {
	return (
		<main className="flex h-[90vh] items-center justify-center">
			<Spinner />
		</main>
	);
}
