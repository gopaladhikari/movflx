import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { MaxwidthWrapper } from "./MaxwidthWrapper";

export function Footer() {
	return (
		<>
			{/* Trial Start First 30 Days. */}
			<section className="bg-yellow text-black">
				<MaxwidthWrapper className="grid-cols-2 space-y-3 p-6 lg:grid">
					<div>
						<strong className="text-xl font-bold">
							Trial Start First 30 Days.
						</strong>
						<p>Enter your email to create or restart your membership.</p>
					</div>
					<form className="flex items-center">input button</form>
				</MaxwidthWrapper>
			</section>

			{/* Footer */}

			<footer
				style={{
					background:
						"url(/footer_bg.jpg) center center / cover no-repeat",
				}}
			>
				<MaxwidthWrapper className="py-6 text-white md:py-10">
					<div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
						<div className="max-w-sm items-start lg:max-w-none">
							<Image
								src="/logo.png"
								alt="logo"
								width={200}
								height={200}
							/>
						</div>
						<nav className="space-x-3 space-y-4">
							{site.mainNav.map(({ id, title, href }) => (
								<Link key={id} href={href} className="font-bold">
									{title}
								</Link>
							))}
						</nav>
					</div>
					<div className="mt-16 border-t border-gray-100 pt-8">
						<p className="text-center text-sm">
							© Company MovFlx {new Date().getFullYear()}. All rights
							reserved.
						</p>
						<p className="text-center text-sm">
							Developed by&nbsp;
							<Link
								color="foreground"
								href="https://github.com/gopaladhikari"
								target="_blank"
								className="text-sm underline underline-offset-4"
							>
								gopaladhikari
							</Link>
						</p>
					</div>
				</MaxwidthWrapper>
			</footer>
		</>
	);
}
