import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/config/site";
import { Providers } from "@/context/providers";
import { Header } from "@/components/common/Header";
import { cn } from "@/utils/cn";
import { cookies } from "next/headers";
import { instance } from "@/config/axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn("bg-black/80", inter.className)}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
