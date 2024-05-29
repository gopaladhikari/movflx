import "../styles/main.scss";
import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/sessionProvider";
import { cookies } from "next/headers";
import { instance } from "@/config/axios";
import ChatBot from "@/components/common/ChatBot";
import { Suspense } from "react";
import TopLoadingBar from "@/components/common/TopLoadingBar";
import { poppins, inter } from "@/config/font";

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

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#0F0E16",
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
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("dark", poppins.variable)}
		>
			<body
				className={cn("bg-background", inter.className)}
				suppressHydrationWarning
			>
				<SessionProvider>
					<Header />
					<main className="min-h-screen antialiased">{children}</main>
					<Footer />
					<Toaster />
					<Suspense>
						<TopLoadingBar />
						<ChatBot />
					</Suspense>
				</SessionProvider>
			</body>
		</html>
	);
}
