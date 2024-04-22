"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { TRegisterSchema, registerSchemas } from "@/schemas/registerSchema";
import { registerUser } from "@/lib/users";
import { Button } from "../ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function RegisterForm() {
	const { toast } = useToast();
	const form = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchemas),
	});

	const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			if (value instanceof FileList) formData.append(key, value[0]);
			else formData.append(key, value);
		});

		const res = await registerUser(formData);

		if (res.ok)
			toast({
				title: "Registration Successful",
				description: "Verification link sent to you email",
			});
		else toast({ title: res.error, variant: "destructive" });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto mt-8 max-w-sm space-y-3"
			>
				<FormField
					control={form.control}
					name="avatar"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel className="font-semibold">Avatar</FormLabel>
							<FormControl>
								<Input
									type="file"
									{...fieldProps}
									placeholder="Avatar"
									onChange={(event) =>
										onChange(
											event.target.files && event.target.files[0]
										)
									}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">First Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Last Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">
								Phone Number
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				{form.formState.isSubmitting ? (
					<Button disabled variant="yellow" className="w-full">
						<Loader2 className="mr-2 size-4 animate-spin" />
						Please wait
					</Button>
				) : (
					<Button variant="yellow" className="w-full" type="submit">
						Register
					</Button>
				)}
			</form>
		</Form>
	);
}
