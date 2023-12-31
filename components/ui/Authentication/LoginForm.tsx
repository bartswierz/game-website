"use client";

// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiLogIn, BiArrowBack } from "react-icons/bi";
import { authenticate } from "@/lib/actions";
import Link from "next/link";
import ClipboardBtn from "../ClipboardBtn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  // Using useFormState to CALL THE SERVER ACTION and HANDLE FORM ERRORS, and useFormStatus to handle the pending state of the form
  // const [code, action] = useFormState(authenticate, undefined);
  // undefined as 2nd parameter is the INITIAL STATE of the form
  const [state, dispatch] = useFormState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);

  // Display/Hide Password on click
  const PasswordToggle = () => {
    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
      <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute right-4X right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-2"
      >
        {showPassword ? <FaEye color="black" /> : <FaEyeSlash color="black" />}
      </button>
    );
  };

  // GIVING ACCOUNT CREDENTIALS TO A DEMO ACCOUNT TO MAKE IT EASY FOR VIEWERS TO CHECKOUT THE APP WITHOUT HAVING TO CREATE AN ACCOUNT
  const DemoAccountCredentials = () => {
    const demoEmail = "user@nextmail.com";
    const demoPassword = "123456";

    return (
      <div className="divide-double border-t-2 border-gray-500 mt-2 pt-2 text-gray-500">
        <span className="underline font-semibold">Demo Account</span>
        {/* EMAIL & PASSWORD*/}
        <div className="flex flex-col">
          <span className="self-start items-center justify-center flex gap-2">
            <b>user@nextmail.com</b>
            <ClipboardBtn text={demoEmail} />
          </span>
          <span className="self-start items-center justify-center flex gap-2">
            <b>123456</b>
            <ClipboardBtn text={demoPassword} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <form action={dispatch} className="space-y-3 text-white m-2 w-full max-w-[88vw] md:w-[400px] relative card mx-2">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8 drop-shadow-2xl shadow-2xl bg-slate-900/95">
        <h1 className={`mb-3 text-2xl w-full text-center font-bold`}>Next-Level Games</h1>
        <h2 className={`mb-3 text-2xl w-full text-center font-bold`}>Login</h2>
        <div className="w-full">
          {/* EMAIL INPUT */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-sm border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
              <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* PASSWORD INPUT */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900-" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-sm border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                id="password"
                // type="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                minLength={6}
                required
              />
              <PasswordToggle />
              <HiOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* IF user inputs wrong username or password, displays, 'Invalid credentials; under the password input */}
        <div className="flex h-8 items-end- space-x-1 align-middle items-center">
          {/* {code === "CredentialSignin" && ( */}
          {state === "CredentialSignin" && (
            <>
              <BsExclamationCircleFill className="h-4 w-4 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <LoginButton />
        </div>
        <p>
          Don&#39;t have an account yet?{" "}
          <Link href={"/signup"} className="underline text-blue-500 hover:text-blue-600 focus:text-blue-700">
            Sign up
          </Link>
        </p>
        <DemoAccountCredentials />
      </div>

      {/* Animated Border */}
      {/* <a
        href="#"
        className="animate-background animate-border inline-block bg-white from-pink-500 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r"
      >
        <span className="block bg-gray-900 px-5 py-3 text-white"> Get Started </span>
      </a> */}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  /* Log in */
  return (
    <button
      className="mt-4 w-full bg-blue-600 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
      aria-disabled={pending}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <span className="flex items-center">
        Log in <BiLogIn className="ml-auto h-5 w-5 text-gray-50" />
      </span>
    </button>
  );
}
