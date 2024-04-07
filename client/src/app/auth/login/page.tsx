import { LoginForm } from "@/components/auth/LoginForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";

export const metadata = {
  title: "Login",
};

export default function page() {
  return (
    <main>
      <MaxwidthWrapper>
        <LoginForm />
      </MaxwidthWrapper>
    </main>
  );
}
