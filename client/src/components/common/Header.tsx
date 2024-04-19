import { getCurrentUser } from "@/utils/session";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	CreditCard,
	Github,
	LifeBuoy,
	Plus,
	Settings,
	User,
	Users,
	AlignJustify,
	MoveRight,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { site } from "@/config/site";

import { MaxwidthWrapper } from "./MaxwidthWrapper";
import { Logo } from "./Logo";
import { LogoutButton } from "../auth/LogoutButton";

export async function Header() {
	const session = await getCurrentUser();
	return (
		<header>
			<nav>
				<MaxwidthWrapper className="grid grid-cols-12 place-content-center">
					<Link href="/" className="col-span-6 lg:col-span-3">
						<Logo />
					</Link>

					<menu className="col-span-6 mx-auto hidden items-center gap-8 lg:flex">
						{site.mainNav.map(({ href, id, title }) => (
							<li key={id}>
								<Link href={href}>{title}</Link>
							</li>
						))}
					</menu>

					<div className="col-span-6 flex grow items-center justify-end gap-4 lg:col-span-3">
						{!session?.user && (
							<menu className="ml-auto hidden items-center justify-between gap-4 		lg:flex">
								<li>
									<Link href="/auth/login">Login</Link>
								</li>
								<li>
									<Link href="/auth/register">Register</Link>
								</li>
							</menu>
						)}

						{/* User Dropdown */}
						{session?.user && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar>
										<AvatarImage
											src={session?.user?.avatar || ""}
											alt={session?.user?.name || ""}
										/>

										<AvatarFallback>
											{session?.user?.name}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<User className="mr-2 size-4" />
											<span>Profile</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CreditCard className="mr-2 size-4" />
											<span>Billing</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Settings className="mr-2 size-4" />
											<span>Settings</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<Users className="mr-2 size-4" />
											<span>Team</span>
										</DropdownMenuItem>

										<DropdownMenuItem>
											<Plus className="mr-2 size-4" />
											<span>New Team</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Github className="mr-2 size-4" />
										<span>GitHub</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<LifeBuoy className="mr-2 size-4" />
										<span>Support</span>
									</DropdownMenuItem>

									<DropdownMenuSeparator />
									<LogoutButton />
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{/* Hamburger menu */}
						<div className="lg:hidden ">
							<Sheet>
								<SheetTrigger asChild className="cursor-pointer">
									<AlignJustify />
								</SheetTrigger>
								<SheetContent className="overflow-auto">
									<SheetHeader className="text-start">
										<SheetTitle>
											<Logo />
										</SheetTitle>
										<SheetDescription>
											{site.description}
										</SheetDescription>
									</SheetHeader>
									<menu className="mt-6 space-y-3">
										{site.mainNav.map(({ href, id, title }) => (
											<li key={id}>
												<SheetClose
													asChild
													className="flex justify-between"
												>
													<Link href={href}>
														{title} <MoveRight />
													</Link>
												</SheetClose>
											</li>
										))}
									</menu>
									{!session?.user && (
										<menu className="absolute bottom-0 right-0 z-[1000000000] w-full space-y-3 p-4">
											<li>
												<SheetClose asChild>
													<Link
														className="flex w-full items-center justify-center gap-2 rounded-lg border bg-yellow p-2 font-semibold text-primary-foreground"
														href="/auth/login"
													>
														Login <MoveRight />
													</Link>
												</SheetClose>
											</li>
											<li>
												<SheetClose asChild>
													<Link
														className="flex w-full items-center justify-center gap-2 rounded-lg border bg-yellow p-2 font-semibold text-primary-foreground"
														href="/auth/register"
													>
														Register <MoveRight />
													</Link>
												</SheetClose>
											</li>
										</menu>
									)}
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</MaxwidthWrapper>
			</nav>
		</header>
	);
}
