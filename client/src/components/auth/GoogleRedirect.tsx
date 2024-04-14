"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Button,
	ModalFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GoogleRedirect() {
	const { onClose } = useDisclosure();
	const router = useRouter();

	const [count, setCount] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		if (count === 0) router.push("/me");

		return () => clearInterval(interval);
	}, [count, router]);

	return (
		<Modal backdrop="blur" isOpen onClose={onClose}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Your&apos; sucessfully logged in.
						</ModalHeader>
						<ModalBody>
							<p>Your will be redirect to homepage in {count}s</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color="success"
								onPress={() => router.push("/me")}
								className="data-[focus-visible=true]:outline-0"
							>
								Redirect now
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
