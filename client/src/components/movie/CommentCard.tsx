import { IComment } from "@/types/comments.type";
import { User } from "@nextui-org/react";

type Props = {
  comment: IComment;
};

function timeAgo(dateString: string): string {
  const currentDate = new Date();
  const previousDate = new Date(dateString);

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30;
  const millisecondsPerYear = millisecondsPerDay * 365;

  const elapsed = currentDate.getTime() - previousDate.getTime();

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

export function CommentCard({ comment }: Props) {
  return (
    <div className="space-y-2 rounded-xl bg-black px-3 py-4">
      <User
        name={comment?.name}
        description={timeAgo(comment?.date)}
        avatarProps={{
          name: comment?.name,
        }}
      />
      <p className="pl-3 text-medium">{comment?.text}</p>
    </div>
  );
}
