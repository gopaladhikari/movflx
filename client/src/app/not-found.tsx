import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section>
        <MaxwidthWrapper className="flex h-[80vh] flex-col items-center justify-center">
          <h1 className="text-8xl font-bold">404</h1>
          <p className="text-4xl font-medium">Page Not Found</p>
          <Link href="/" className="mt-4 text-xl text-blue-600 hover:underline">
            Go back home
          </Link>
        </MaxwidthWrapper>
      </section>
    </main>
  );
}
