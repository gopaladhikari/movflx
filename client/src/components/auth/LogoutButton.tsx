"use client";

import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogoutButton() {
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		try {
			setLoading(true);
			await signOut();
		} finally {
			setLoading(false);
		}
	};

	if (loading)
		return (
			<button
				type="button"
				disabled
				className="flex w-full items-center px-2 transition-colors hover:bg-secondary"
			>
				<Loader2 className="mr-2 size-4 animate-spin" />
				Please wait
			</button>
		);

	return (
		<button
			type="button"
			onClick={handleLogout}
			className="flex w-full items-center px-2 transition-colors hover:bg-secondary"
		>
			<LogOut className="mr-2 size-4" />
			<span>Log out</span>
		</button>
	);
}
