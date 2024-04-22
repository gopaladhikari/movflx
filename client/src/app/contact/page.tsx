import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function page() {
	return (
		<main>
			<section>
				<MaxwidthWrapper className="my-8 grid gap-4 sm:grid-cols-6">
					<ContactForm className="col-span-4" />
					<aside className="col-span-2">
						<h2 className="mb-6 w-fit border-b-2 border-yellow pb-2 text-lg font-bold">
							Information
						</h2>
						<div className="mt-4 rounded-2xl bg-background-secondary px-6 py-12">
							<p className="border-b-2 border-yellow pb-6 text-sm">
								<span className="font-semibold">Find solutions : </span>
								<span className="text-white/90">
									to common problems, or get help from a support agent
									industry&apos;s standard .
								</span>
							</p>
							<address className="mt-4">
								<p className="flex items-center gap-2 border-b-2 border-yellow pb-6">
									<span className="rounded-full bg-yellow p-2 text-black">
										<MapPin size={24} />{" "}
									</span>
									<span className="font-bold">Address :</span>
									<span className="text-white/90">
										W38 Park Road New York
									</span>
								</p>
								<p className="flex items-center gap-2 border-b-2 border-yellow py-6">
									<span className="rounded-full bg-yellow p-2 text-black">
										<Phone size={24} />{" "}
									</span>
									<span className="font-bold">Phone :</span>
									<Link
										href="tel:(09)123854365"
										className="text-white/90"
									>
										(09) 123 854 365
									</Link>
								</p>
								<p className="flex items-center gap-2 border-b-2 border-yellow py-6">
									<span className="rounded-full bg-yellow p-2 text-black">
										<MessageCircle size={24} />{" "}
									</span>
									<span className="font-bold">Email :</span>
									<Link
										href="mailto:support@movflx.com"
										className="text-white/90"
									>
										support@movflx.com
									</Link>
								</p>
							</address>
						</div>
					</aside>
				</MaxwidthWrapper>
			</section>
		</main>
	);
}
