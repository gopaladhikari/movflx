import { getCurrentUser } from "@/utils/session";

import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UpdateUser } from "@/components/auth/UpdateUser";

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await getCurrentUser();

  let fullName: string = "Me";

  if (session?.user?.name) fullName = session?.user?.name;
  else if (session?.user?.firstName && session?.user?.lastName)
    fullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

  return {
    title: fullName,
    description: `Profile page for the user ${fullName} on Movflx`,
  };
};

export default async function page() {
  const session = await getCurrentUser();
  const user = session?.user;

  if (!user) redirect("/auth/login");

  let fullName: string = "Me";

  if (session?.user?.name) fullName = session?.user?.name;
  else if (session?.user?.firstName && session?.user?.lastName)
    fullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

  return (
    <section>
      <Image
        src={user?.avatar || ""}
        alt={user?.name || ""}
        width={120}
        height={120}
        className="size-32 rounded-full object-contain"
      />
      <h1 className="text-3xl font-bold">{fullName}</h1>

      <p className="text-sm text-gray-300">{user?.email}</p>

      <UpdateUser />
    </section>
  );
}
