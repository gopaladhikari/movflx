"use client";

import { useSession } from "next-auth/react";
import { addCommentOnMovie } from "@/lib/comments";
import { TTextSchema, textSchema } from "@/schemas/updateCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

type Props = {
	movieId: string;
};

export function AddComment({ movieId }: Props) {
	const { toast } = useToast();
	const { data: session, status } = useSession();

	const form = useForm<TTextSchema>({
		resolver: zodResolver(textSchema),
	});

	const onSubmit: SubmitHandler<TTextSchema> = async ({ text }) => {
		if (status === "unauthenticated") {
			toast({
				variant: "destructive",
				title: "Unauthenticated.",
				description: "You need to be logged in to post a comment.",
			});
			return;
		}

		const res = await addCommentOnMovie(
			movieId,
			text,
			session?.user?.email,
			session?.user?.name as string,
			session?.user?.avatar as string
		);

		if (res?.sucess) form.setValue("text", "");
		else
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: "There was a problem with your request.",
			});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3"
			>
				<div className="flex w-full items-center gap-4">
					<Avatar>
						<AvatarImage src={session?.user?.avatar} />
						<AvatarFallback>
							{session?.user?.name} || user{" "}
						</AvatarFallback>
					</Avatar>
					<FormField
						control={form.control}
						name="text"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input placeholder="Add a comment..." {...field} />
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex w-full items-center justify-end">
					{form.formState.isSubmitting ? (
						<Button disabled>
							<Loader2 className="mr-2 size-4 animate-spin" />
							Please wait
						</Button>
					) : (
						<Button variant="secondary" type="submit">
							Comment
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}
