"use client";

import { Share2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface Props {
	className?: string;
}

export function ShareButton({ className }: Props) {
	const { handleSubmit } = useForm();

	const onSubmit = async () => {
		const currentLocation = window.location.href;
		try {
			await window.navigator.clipboard.writeText(currentLocation);
			toast({
				title: "Link Copied",
				description: "Link has been copied to clipboard",
			});
		} catch (error) {
			toast({ title: "Error", description: (error as Error).message });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("cols-span-6", className)}
		>
			<Button type="submit" title="Share">
				<Share2 />
			</Button>
		</form>
	);
}
