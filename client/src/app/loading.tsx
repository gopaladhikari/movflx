import { Spinner } from "@nextui-org/react";

export default function loading() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Spinner />
    </main>
  );
}
