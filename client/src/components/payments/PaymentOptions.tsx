"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentSchema, PaymentType } from "@/schemas/paymentSchema";
import Image from "next/image";
import { Payment } from "@/types/pricing";
import { createEsewaPayment, createKhaltiPayment } from "@/lib/payment";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const esewaGatewayUrl = process.env.NEXT_PUBLIC_ESEWA_GATEWAY_URL;

interface Props {
	paymentMethods: Payment[] | undefined;
	plan: string;
}

export function PaymentOptions({ paymentMethods, plan }: Props) {
	const session = useSession();

	const router = useRouter();

	let fullName: string = "Me";

	if (session?.data?.user?.name) fullName = session?.data?.user?.name;
	else if (session?.data?.user?.firstName && session?.data?.user?.lastName)
		fullName = `${session?.data?.user?.firstName} ${session?.data?.user?.lastName}`;

	const form = useForm<PaymentType>({
		resolver: zodResolver(PaymentSchema),
	});

	const onSubmit: SubmitHandler<PaymentType> = async (option) => {
		if (session.status === "unauthenticated") {
			toast({
				title: "Unauthenticated",
				description: "You need to be logged in to make a payment.",
				variant: "destructive",
			});
			return;
		}

		if (option.name === "Esewa") {
			const email = session.data?.user?.email;
			const res = await createEsewaPayment(plan, email);

			if (res?.sucess) {
				const paymentForm = document.createElement("form");
				paymentForm.setAttribute("method", "post");
				paymentForm.setAttribute("action", String(esewaGatewayUrl));

				Object.entries(res.data).forEach(([key, value]) => {
					const input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", key);
					input.setAttribute("value", String(value));
					paymentForm.appendChild(input);
				});
				document.body.appendChild(paymentForm);
				paymentForm.submit();
			} else
				toast({
					title: "Payment failed",
					description:
						res?.message || String(res) || "Something went wrong",
					variant: "destructive",
				});
		} else if (option.name === "Khalti") {
			const email = session.data?.user?.email;
			const res = await createKhaltiPayment(plan, email, fullName);

			if (res.ok) router.push(String(res?.data?.payment_url));
			else
				toast({
					title: "Payment failed",
					description: res?.error || "Something went wrong",
					variant: "destructive",
				});
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full space-y-3">
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									{paymentMethods?.map(({ id, name, img }) => (
										<FormItem
											key={id}
											className="flex w-full items-center gap-3 border px-4"
										>
											<FormControl>
												<RadioGroupItem value={name} />
											</FormControl>
											<FormLabel className="w-full cursor-pointer">
												<figure className="flex w-full items-center gap-3 py-2">
													<Image
														src={img}
														alt={name}
														width={40}
														height={40}
														className="size-10 rounded-full"
													/>
													<figcaption className="textlg mx-auto font-bold">
														{name}
													</figcaption>
												</figure>
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{form.formState.isSubmitting ? (
					<Button disabled variant="yellow" className="w-full">
						<Loader2 className="mr-2 size-4 animate-spin" />
						Please wait
					</Button>
				) : (
					<Button variant="yellow" type="submit" className="w-full">
						Continue
					</Button>
				)}
			</form>
		</Form>
	);
}
