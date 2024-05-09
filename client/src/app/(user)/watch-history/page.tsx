import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";

function FilterIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="size-5 text-gray-500 dark:text-gray-400"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
		</svg>
	);
}

export default function Component() {
	return (
		<div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
			<header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
				<h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					Ride History
				</h1>
				<Button size="icon" variant="ghost">
					<FilterIcon />
				</Button>
			</header>
			<div className="flex-1 space-y-4 overflow-y-auto p-4">
				<Card>
					<CardContent className="grid grid-cols-[48px_1fr_auto] items-center gap-4">
						<Avatar className="size-12">
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								John Doe
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Pickup: </span>
								<span>123 Main St, Anytown USA</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Drop-off: </span>
								<span>456 Oak Rd, Anytown USA</span>
							</div>
						</div>
						<div className="space-y-2 text-right">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								$15.00
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Credit Card
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Apr 15, 2023 at 6:30 PM
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="grid grid-cols-[48px_1fr_auto] items-center gap-4">
						<Avatar className="size-12">
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								Jane Smith
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Pickup: </span>
								<span>789 Oak St, Anytown USA</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Drop-off: </span>
								<span>321 Maple Ln, Anytown USA</span>
							</div>
						</div>
						<div className="space-y-2 text-right">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								$12.50
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Cash
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Apr 10, 2023 at 4:45 PM
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="grid grid-cols-[48px_1fr_auto] items-center gap-4">
						<Avatar className="size-12">
							<AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								Michael Johnson
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Pickup: </span>
								<span>555 Elm St, Anytown USA</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								<span>Drop-off: </span>
								<span>777 Pine Rd, Anytown USA</span>
							</div>
						</div>
						<div className="space-y-2 text-right">
							<div className="font-medium text-gray-900 dark:text-gray-100">
								$18.75
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Debit Card
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Apr 5, 2023 at 8:00 PM
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
