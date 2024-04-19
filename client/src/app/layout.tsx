import "../styles/globals.css";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/sessionProvider";
import { cookies } from "next/headers";
import { instance } from "@/config/axios";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
	title: {
		default: site.name,
		template: `%s | ${site.name}`,
	},

	description: site.description,

	icons: {
		icon: "/favicon.png",
	},

	metadataBase: new URL(site.url),

	openGraph: {
		title: site.name,
		description: site.description,
		siteName: site.name,
		url: site.url,
		locale: "en-US",
		type: "website",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const token = cookies().get("token")?.value;
	if (token)
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={cn("bg-background", poppins.className)}
				suppressHydrationWarning
			>
				<SessionProvider>
					<Header />
					<main className="min-h-screen antialiased">{children}</main>
					<Footer />
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
}
