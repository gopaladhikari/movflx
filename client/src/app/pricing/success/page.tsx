import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CirclecheckIcon } from "@/components/icons/circle-check-icon";
import { redirect } from "next/navigation";
import { getPurchasedInfo } from "@/lib/pricing";

type SearchParams = {
	searchParams?: {
		id: string | undefined;
	};
};

export default async function Page({ searchParams }: SearchParams) {
	console.log("searchParams", searchParams);

	const res = await getPurchasedInfo(String(searchParams?.id));

	if (!res.ok) return redirect("/");

	const paymentDate = new Date(res.data?.paymentDate as string);

	const paymentDateString = paymentDate.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});

	return (
		<section>
			<div className="flex min-h-[90vh] flex-col items-center justify-center">
				<Card className="w-full max-w-md space-y-6 rounded-lg  p-6 shadow-lg">
					<div className="flex flex-col items-center">
						<CirclecheckIcon />
						<h1 className="mt-4 text-3xl font-bold text-gray-50">
							Payment Successful
						</h1>
						<p className="mt-2 text-gray-500 dark:text-gray-400">
							Thank you for your payment. Your order is being processed.
						</p>
					</div>
					<div className="space-y-4 border-t border-gray-700 pt-6">
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Amount Paid:
							</span>
							<span className="font-medium text-gray-50">
								NPR {res.data?.amount}{" "}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Payment Method:
							</span>
							<span className="font-medium text-gray-50">
								{res.data?.paymentMethod}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Date & Time:
							</span>
							<span className="font-medium text-gray-50">
								{paymentDateString}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Puchase Plan
							</span>
							<span className="font-medium text-gray-50">
								{res.data?.purchasePlan}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Transaction ID
							</span>
							<span className="font-medium text-gray-50">
								{res.data?.transactionId}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								PIDX
							</span>
							<span className="font-medium text-gray-50">
								{res.data?.pidx}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 dark:text-gray-400">
								Status
							</span>
							<span className="font-medium text-gray-50">
								{res.data?.status}
							</span>
						</div>
					</div>
					<div className="flex justify-center">
						<Link
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 font-medium transition-colors hover:bg-gray-900/80"
							href="/"
						>
							Go to Homepage
						</Link>
					</div>
				</Card>
			</div>
		</section>
	);
}
