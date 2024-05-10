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

interface Props {
	paymentMethods: Payment[] | undefined;
}

export function PaymentOptions({ paymentMethods }: Props) {
	const form = useForm<PaymentType>({
		resolver: zodResolver(PaymentSchema),
	});

	const onSubmit: SubmitHandler<PaymentType> = async (data) => {
		console.log(data);
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
				<Button type="submit" variant="yellow" className="w-full">
					Continue
				</Button>
			</form>
		</Form>
	);
}
