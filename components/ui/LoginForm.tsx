"use client";

// import { lusitana } from "@/app/ui/fonts";
// import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import { Button } from "./button";
// @ts-expect-error

import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { useFormState, useFormStatus } from "react-dom";
import { BsExclamationCircleFill } from "react-icons/bs";
// import { experimental_useFormStatus as useFormState, experimental } from "react-dom";
// import { experimental_useFormState as useFormState } from "react-dom";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);

  return (
    <form action={action} className="space-y-3 text-white m-2 w-[280px] md:w-[400px]">
      <div className="flex-1 rounded-lg bg-gray-50- px-6 pb-4 pt-8 bg-slate-900 drop-shadow-2xl shadow-2xl">
        {/* <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue.</h1> */}
        {/* <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1> */}
        <h1 className={`mb-3 text-2xl w-full text-center font-bold`}>Next-Level Games</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900-" htmlFor="email">
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
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900-" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-sm border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
              />
              <HiOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex h-8 items-end- space-x-1 align-middle items-center">
          {code === "CredentialSignin" && (
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

          <Link
            href={"/"}
            className="bg-gray-500 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-gray-600 transition-colors duration-300"
          >
            Back
          </Link>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  // <Button className="mt-4 w-full" aria-disabled={pending}>
  return (
    <button
      className="mt-4 w-full bg-blue-600 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
      aria-disabled={pending}
    >
      Log in
      {/* Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
    </button>
  );
}
