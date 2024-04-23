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

			<section>
				<MaxwidthWrapper>
					<iframe
						title="GoogleMap"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57148.70073092478!2d87.46203900462739!3d26.462374980878973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7e58a2911917%3A0x245693bf47a14e6!2sRangeli%2056600!5e0!3m2!1sen!2snp!4v1713850612700!5m2!1sen!2snp"
						height={450}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="my-16 w-full"
					/>
				</MaxwidthWrapper>
			</section>
		</main>
	);
}
