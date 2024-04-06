import { LoginForm } from "@/components/auth/LoginForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";

export default function page() {
  return (
    <main>
      <MaxwidthWrapper>
        <LoginForm />
      </MaxwidthWrapper>
    </main>
  );
}
