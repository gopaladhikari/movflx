"use client";

import { contactSchema, TContactSchema } from "@/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { createContact } from "@/lib/contact";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	className?: string;
};

export function ContactForm({ className }: Props) {
	const { toast } = useToast();
	const form = useForm<TContactSchema>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit: SubmitHandler<TContactSchema> = async (data) => {
		const res = await createContact(data);
		if (res?.sucess) {
			toast({
				title: "Your message has been sent successfully",
			});
			form.reset({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} else
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
			});
	};

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<h1 className="mb-6 w-fit border-b-2 border-yellow pb-2 text-lg font-bold">
					Contact form
				</h1>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 rounded-2xl border px-4 py-8"
				>
					<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="bg-background-secondary"
											placeholder="Your Name"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="bg-background-secondary"
											placeholder="Your Email"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="bg-background-secondary"
										placeholder="Subject"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className="bg-background-secondary"
										placeholder="Type here..."
										{...field}
									/>
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
							Submit
						</Button>
					)}
				</form>
			</Form>
		</div>
	);
}
