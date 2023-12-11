import { Metadata } from "next";
import LoginForm from "@/components/ui/Authentication/LoginForm";
import Link from "next/link";
import CreateAccountForm from "@/components/ui/Authentication/CreateAccountForm";
export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      {/* <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32"> */}
      <div className="">
        {/* <LoginForm /> */}
        <CreateAccountForm />
        {/* <Link href={"/login"} className="text-blue-500 underline">
          Back to Login
        </Link> */}
      </div>
    </div>
  );
}
