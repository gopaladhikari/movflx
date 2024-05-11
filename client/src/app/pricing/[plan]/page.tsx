import { PaymentOptions } from "@/components/payments/PaymentOptions";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { toast } from "@/components/ui/use-toast";
import { getPaymentOptions } from "@/lib/pricing";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Params = {
	params?: {
		plan: string;
	};
};

export async function generateMetadata({
	params,
}: Params): Promise<Metadata> {
	if (!params?.plan) return {};

	const title = params.plan
		.charAt(0)
		.toUpperCase()
		.concat(params.plan.slice(1), " Plan");

	return { title };
}

export default async function Page({ params }: Params) {
	if (!params?.plan || params.plan === "undefined")
		return redirect("/pricing");

	const res = await getPaymentOptions();

	if (!res.data) toast({ title: res.error, variant: "destructive" });

	return (
		<section>
			<MaxwidthWrapper className="mt-16 max-w-lg space-y-4 border p-6 md:py-16">
				<h1 className="text-center text-3xl font-bold">Payment Plan</h1>
				<p className="text-center">
					How do you want to pay ?<strong> {params.plan} plan</strong> .
				</p>

				<PaymentOptions paymentMethods={res?.data} plan={params.plan} />
			</MaxwidthWrapper>
		</section>
	);
}
