import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { MoviepageHeroSection } from "@/components/movie/HeroSection";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { site } from "@/config/site";
import { Check } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Pricing",
};

export default function page() {
	return (
		<>
			<section>
				<MoviepageHeroSection>
					<div className="grid h-[70vh] place-content-center space-y-2">
						<h2 className="text-xl font-bold md:text-3xl lg:text-5xl">
							Our <span className="text-yellow">Pricing</span>
						</h2>
						<div className="flex h-5 items-center justify-center space-x-4">
							<strong className="text-yellow">Home</strong>
							<strong>Pricing</strong>
						</div>
					</div>
				</MoviepageHeroSection>
			</section>
			<section>
				<MaxwidthWrapper className="mt-6">
					<p className="text-center text-sm text-white/90">OUR PRICING PLANS</p>
					<h1 className="text-center text-3xl font-bold">
						Our Pricing Strategy
					</h1>
					<div className="my-8 grid grid-cols-3 gap-12">
						{site.pricingPlans.map(
							({ id, price, plan, screens, videoQuality, videoResolution }) => (
								<Card
									key={id}
									className="bg-background-secondary py-8 outline outline-background-secondary transition-all duration-700 hover:outline-yellow"
								>
									<CardHeader>
										<CardTitle className="text-center text-sm">
											{plan.toUpperCase()}
										</CardTitle>
										<div className="mx-auto flex w-fit flex-col items-center justify-center rounded-xl bg-yellow p-6 text-lg font-bold text-black shadow-lg">
											NPR {price}
											<span>Monthly</span>
										</div>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between border-b-2 border-white/50 pb-2 pt-6 text-sm">
											<p className="flex items-center gap-2">
												<Check size={18} className="font-bold" /> Video quality
											</p>
											<span className="text-yellow">{videoQuality}</span>
										</div>
										<div className="flex items-center justify-between border-b-2 border-white/50 pb-2 pt-6 text-sm">
											<p className="flex items-center gap-2">
												<Check size={18} className="font-bold" /> Resolution
											</p>
											<span>{videoResolution}</span>
										</div>
										<div className="flex items-center justify-between border-b-2 border-white/50 pb-2 pt-6  text-sm">
											<p className="flex items-center gap-2">
												<Check size={18} className="font-bold" /> Screens you
												can watch 1
											</p>
											<span>{screens}</span>
										</div>
										<div className="flex items-center justify-between border-b-2 border-white/50 pb-2 pt-6  text-sm">
											<p className="flex items-center gap-2">
												<Check size={18} className="font-bold" /> Cancel anytime
											</p>
										</div>
									</CardContent>
									<CardFooter>
										<Link
											href={`/pricing/${plan}`}
											className="mx-auto rounded-full border border-yellow bg-background-secondary px-8 py-2 font-semibold transition-all duration-300 hover:bg-yellow hover:text-black "
										>
											Buy Now
										</Link>
									</CardFooter>
								</Card>
							)
						)}
					</div>
				</MaxwidthWrapper>
			</section>
		</>
	);
}
