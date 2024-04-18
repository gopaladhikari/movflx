// import { IComment } from "@/types/comments.type";
import { UpdateAndDeleteComment } from "./UpdateAndDeleteComment";

// type Props = {
// 	comment: IComment;
// 	currentUserEmail?: string;
// };
// function timeAgo(dateString: string): string {
// 	const currentDate = new Date();
// 	const previousDate = new Date(dateString);

// 	const elapsed = currentDate.getTime() - previousDate.getTime();

// 	const millisecondsPerMinute = 60 * 1000;
// 	const millisecondsPerHour = millisecondsPerMinute * 60;
// 	const millisecondsPerDay = millisecondsPerHour * 24;
// 	const millisecondsPerMonth = millisecondsPerDay * 30;
// 	const millisecondsPerYear = millisecondsPerDay * 365;

// 	if (elapsed < millisecondsPerMinute)
// 		return `${Math.round(elapsed / 1000)} seconds ago`;

// 	if (elapsed < millisecondsPerHour)
// 		return `${Math.round(elapsed / millisecondsPerMinute)} minutes ago`;

// 	if (elapsed < millisecondsPerDay)
// 		return `${Math.round(elapsed / millisecondsPerHour)} hours ago`;

// 	if (elapsed < millisecondsPerMonth)
// 		return `${Math.round(elapsed / millisecondsPerDay)} days ago`;

// 	if (elapsed < millisecondsPerYear)
// 		return `${Math.round(elapsed / millisecondsPerMonth)} months ago`;

// 	return `${Math.round(elapsed / millisecondsPerYear)} years ago`;
// }

export function CommentCard() {
	return (
		<div className="flex w-full justify-between gap-3 rounded-xl bg-black px-3 py-4">
			<UpdateAndDeleteComment />
		</div>
	);
}
