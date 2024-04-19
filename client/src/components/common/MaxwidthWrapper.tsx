import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	className?: string;
};

export function MaxwidthWrapper({ className, children }: Props) {
	return (
		<div
			className={cn(
				"container px-6 md:px-8 mx-auto py-2 md:py-4",
				className
			)}
		>
			{children}
		</div>
	);
}
