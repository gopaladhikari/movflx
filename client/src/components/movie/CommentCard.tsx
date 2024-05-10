"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, EllipsisVertical, Flag } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCommentById } from "@/lib/comments";
import { Comment } from "@/types/comments";
import { Button } from "../ui/button";

type Props = {
	comment: Comment;
};

function timeAgo(dateString: Date): string {
	const currentDate = new Date();
	const previousDate = new Date(dateString);

	const elapsed = currentDate.getTime() - previousDate.getTime();

	const millisecondsPerMinute = 60 * 1000;
	const millisecondsPerHour = millisecondsPerMinute * 60;
	const millisecondsPerDay = millisecondsPerHour * 24;
	const millisecondsPerMonth = millisecondsPerDay * 30;
	const millisecondsPerYear = millisecondsPerDay * 365;

	if (elapsed < millisecondsPerMinute)
		return `${Math.round(elapsed / 1000)} seconds ago`;

	if (elapsed < millisecondsPerHour)
		return `${Math.round(elapsed / millisecondsPerMinute)} minutes ago`;

	if (elapsed < millisecondsPerDay)
		return `${Math.round(elapsed / millisecondsPerHour)} hours ago`;

	if (elapsed < millisecondsPerMonth)
		return `${Math.round(elapsed / millisecondsPerDay)} days ago`;

	if (elapsed < millisecondsPerYear)
		return `${Math.round(elapsed / millisecondsPerMonth)} months ago`;

	return `${Math.round(elapsed / millisecondsPerYear)} years ago`;
}

export async function CommentCard({ comment }: Props) {
	const { data: session } = useSession();
	const email = session?.user?.email;
	const isMyComment = email === comment?.email;

	const handleDelete = async () => {
		await deleteCommentById(comment._id);
	};

	return (
		<div className="flex w-full justify-between rounded-xl  bg-black px-3 py-6">
			<div className="w-full space-y-3">
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarImage src={comment?.commentetor_avatar} />
						<AvatarFallback>{comment?.name}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-px">
						<strong>{comment?.name}</strong>
						<span className="text-sm text-white/70">
							{timeAgo(comment.date)}
						</span>
					</div>
				</div>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild className="cursor-pointer">
					<EllipsisVertical size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					{isMyComment ? (
						<>
							<DropdownMenuItem className="cursor-pointer gap-3">
								<Pencil size={14} /> Edit
							</DropdownMenuItem>
							<Dialog>
								<DialogTrigger className="flex w-full cursor-pointer items-center gap-3 px-2 py-1 transition-colors hover:bg-secondary">
									<Trash2 size={14} /> Delete
								</DialogTrigger>

								<DialogContent>
									<DialogHeader>
										<DialogTitle>Are you absolutely sure?</DialogTitle>
										<DialogDescription>
											This action cannot be undone. This will permanently delete
											your account and remove your data from our servers.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter className="justify-end">
										<DialogClose asChild>
											<Button type="button" variant="ghost">
												Close
											</Button>
										</DialogClose>
										<DialogClose asChild>
											<Button
												type="button"
												variant="destructive"
												onClick={handleDelete}
											>
												Delete
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</>
					) : (
						<DropdownMenuItem className="cursor-pointer gap-3">
							<Flag size={14} /> Report
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
