"use client";

import { logoutUser } from "@/lib/users";
import { usePathname, useRouter } from "next/navigation";
import { TUser } from "@/types/user.types";
import {
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";

type Props = {
	user: TUser | undefined;
};

export function UserDropDown({ user }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogout = async () => {
		const res = await logoutUser();
		if (res.ok && pathname === "/me") router.push("/");
	};

	return (
		<div className="flex items-center gap-4">
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Avatar
						isBordered
						as="button"
						className="transition-transform"
						src={user?.avatar || ""}
					/>
				</DropdownTrigger>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem key="profile" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{user?.email}</p>
					</DropdownItem>
					<DropdownItem key="settings">
						<Link href="/profile">Profile</Link>
					</DropdownItem>
					<DropdownItem key="team_settings">
						<Link href="/setting">Setting</Link>
					</DropdownItem>
					<DropdownItem key="analytics">Analytics</DropdownItem>
					<DropdownItem key="system">System</DropdownItem>
					<DropdownItem key="configurations">Configurations</DropdownItem>
					<DropdownItem key="help_and_feedback">
						Help & Feedback
					</DropdownItem>
					<DropdownItem key="logout" color="danger" onClick={handleLogout}>
						Logout
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}
