import "../styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/config/site";
import { Providers } from "@/context/providers";
import { Header } from "@/components/common/Header";
import { cn } from "@/utils/cn";
import { Footer } from "@/components/common/Footer";
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
  if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn("bg-black-bg", poppins.className)}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
