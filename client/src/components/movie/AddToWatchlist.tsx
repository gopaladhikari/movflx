"use client";

import { cn } from "@/lib/utils";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { addToWatchlist } from "@/lib/watchlist";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface Props {
	className?: string;
	movieId: string;
}

export function AddToWatchlist({ className, movieId }: Props) {
	const {
		handleSubmit,
		formState: { isLoading },
	} = useForm();

	const { data, status } = useSession();

	const onSubmit = async () => {
		if (status === "unauthenticated")
			toast({
				title: "Error",
				variant: "destructive",
				description: "You must be logged in to add to watchlist",
			});
		else if (status === "loading")
			toast({
				title: "Loading",
				description: "Please wait",
			});
		else {
			const userId = data?.user?._id;
			if (!userId) {
				toast({
					title: "Error",
					variant: "destructive",
					description: "Something went wrong",
				});
				return;
			}
			const res = await addToWatchlist(userId, movieId);

			if (res?.sucess)
				toast({
					title: "Success",
					description: res.message,
				});
			else
				toast({
					title: "Error",
					variant: "destructive",
					description: res?.message,
				});
		}
	};

	if (isLoading)
		return (
			<Button disabled aria-label="Loading">
				<Loader2 className="animate-spin" />
			</Button>
		);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cn(className)}>
			<Button type="submit" title="Add to watchlist">
				<Plus />
			</Button>
		</form>
	);
}
