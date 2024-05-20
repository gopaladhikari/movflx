import { TriangleAlertIcon } from "@/components/icons/TriangleAlertIcon";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<div className="flex min-h-[90vh] flex-col items-center justify-center   px-4 py-12">
			<div className="mx-auto w-full max-w-md rounded-lg  bg-gray-900 p-8 shadow-lg">
				<div className="flex flex-col items-center space-y-6">
					<div className="rounded-full bg-red-500 p-4 text-white">
						<TriangleAlertIcon className="size-8" />
					</div>
					<div className="space-y-2 text-center">
						<h2 className="text-2xl font-bold">Payment Failed</h2>
						<p className="text-gray-500 dark:text-gray-400">
							There was an issue processing your payment. Please try again.
						</p>
					</div>
					<Button className="w-full">Try Again</Button>
				</div>
			</div>
		</div>
	);
}
