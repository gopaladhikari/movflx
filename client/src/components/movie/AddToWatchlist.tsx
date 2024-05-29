import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
	className?: string;
}

export function AddToWatchlist({ className }: Props) {
	return (
		<form className={cn(className)}>
			<Button type="submit" title="Add to watchlist">
				<Plus />
			</Button>
		</form>
	);
}
