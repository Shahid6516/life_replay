import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}