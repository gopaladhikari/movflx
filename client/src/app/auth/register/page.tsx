import { RegisterForm } from "@/components/auth/RegisterForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";

export default function page() {
  return (
    <main>
      <MaxwidthWrapper>
        <h1 className="mt-8 text-center text-3xl font-bold">Register</h1>
        <RegisterForm />
      </MaxwidthWrapper>
    </main>
  );
}
