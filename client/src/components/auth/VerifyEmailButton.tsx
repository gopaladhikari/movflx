// "use client";

// import { verifyUserEmail } from "@/lib/users";
// import { Button } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";
// import { TiTick } from "react-icons/ti";

// export function VerifyEmailButton({ token }: { token: string }) {
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     const res = await verifyUserEmail(token);
//     if (res.ok) {
//       setLoading(false);
//       setSuccess(true);
//       setTimeout(() => router.push("/auth/login"), 3000);
//     } else {
//       setSuccess(false);
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Button
//         variant="ghost"
//         type="submit"
//         isLoading={loading}
//         disabled={loading}
//       >
//         {loading ? "Loading" : "Verify email"}
//       </Button>

//       {success && (
//         <div className="my-3 flex items-center gap-3 bg-emerald-100 p-3 text-emerald-800">
//           <TiTick size={24} /> Your email is verified successfully.
//         </div>
//       )}
//     </form>
//   );
// }

export function VerifyEmailButton() {
	return <div>VerifyEmailButton</div>;
}
