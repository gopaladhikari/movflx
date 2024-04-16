"use client";

import {
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
	user: {
		_id?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		image?: string;
		phoneNumber?: string;
	};
};

export function UserDropDown({ user }: Props) {
	const handleLogout = async () => {
		await signOut();
	};

	return (
		<div className="flex items-center gap-4">
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Avatar
						isBordered
						as="button"
						className="transition-transform"
						src={user?.image || ""}
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
