import { Metadata } from "next";
import LoginForm from "@/components/ui/Authentication/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
