import { site } from "@/config/site";
import { getMe } from "@/lib/users";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { instance } from "@/config/axios";
import { UserDropDown } from "../auth/UserDropDown";
import { MaxwidthWrapper } from "./MaxwidthWrapper";

export async function Header() {
	const token = cookies().get("token")?.value;

	if (token)
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

	const res = await getMe();

	if (res.ok)
		return (
			<MaxwidthWrapper>
				<Navbar
					shouldHideOnScroll
					maxWidth="full"
					className="bg-transparent"
				>
					<NavbarBrand>
						<Link href="/">
							<Image
								src="/logo.png"
								alt="logo"
								width={120}
								height={120}
							/>
						</Link>
					</NavbarBrand>
					<NavbarContent
						className="hidden sm:flex sm:gap-6"
						justify="center"
					>
						{site.mainNav.map(({ id, title, href }) => (
							<NavbarItem key={id} isActive>
								<Link href={href}>{title}</Link>
							</NavbarItem>
						))}
					</NavbarContent>
					<NavbarContent justify="end">
						<UserDropDown user={res?.data} />
					</NavbarContent>
				</Navbar>
			</MaxwidthWrapper>
		);

	return (
		<MaxwidthWrapper>
			<Navbar shouldHideOnScroll maxWidth="full" className="bg-transparent">
				<NavbarBrand>
					<Link href="/">
						<Image src="/logo.png" alt="logo" width={120} height={120} />
					</Link>
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex sm:gap-6" justify="center">
					{site.mainNav.map(({ id, title, href }) => (
						<NavbarItem key={id} isActive>
							<Link href={href}>{title}</Link>
						</NavbarItem>
					))}
				</NavbarContent>
				<NavbarContent justify="end">
					<NavbarItem isActive>
						<Link href="/auth/login">Login</Link>
					</NavbarItem>
					<NavbarItem isActive>
						<Button
							as={Link}
							color="primary"
							href="/auth/register"
							variant="flat"
						>
							Sign Up
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</MaxwidthWrapper>
	);
}
