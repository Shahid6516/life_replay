import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}