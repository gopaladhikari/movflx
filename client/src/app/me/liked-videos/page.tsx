import { getLikedMovies } from "@/lib/like";
import { getCurrentUser } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getCurrentUser();
  const userId = session?.user?._id;

  if (!userId) redirect("/auth/login");

  const res = await getLikedMovies(userId);
  console.log(res);

  return <div>page</div>;
}
