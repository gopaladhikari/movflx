import { RegisterForm } from "@/components/auth/RegisterForm";
import MaxwidthWrapper from "@/components/common/MaxwidthWrapper";

export default function page() {
  return (
    <main>
      <MaxwidthWrapper>
        <RegisterForm />
      </MaxwidthWrapper>
    </main>
  );
}
