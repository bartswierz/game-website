"use client";

// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiLogIn, BiArrowBack } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { authenticate } from "@/lib/actions";
import { createAccount } from "@/lib/actions";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

interface CreateAccountFormProps {
  message: string;
}

// export default function CreateAccountForm({ message }: CreateAccountFormProps) {
export default function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, undefined); //replace authenticate with createAccount
  // Our User error message from the server
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await createAccount(formData);
      // setServerMessage(response.message);
      if (response) {
        setServerMessage(response);
      }
    } catch (error: any) {
      setServerMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="space-y-3 text-white m-2 w-full max-w-[88vw] md:w-[400px] relative card"
    >
      <div className="flex-1 rounded-lg bg-gray-50- px-6 pb-4 pt-8 bg-slate-900 drop-shadow-2xl shadow-2xl">
        <h1 className={`mb-3 text-2xl w-full text-center font-bold`}>Next-Level Games</h1>
        <h2 className={`mb-3 text-2xl w-full text-center font-bold`}>Sign up</h2>
        <div className="w-full">
          {/* Name */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-sm border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                required
                minLength={2}
              />
              <MdAccountCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* EMAIL */}
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
            </div>
          </div>
          {/* PASSWORD */}
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
        {/* ERROR MESSAGE IF USER TRIES CREATING AN ACCOUNT WITH AN EMAIL ALREADY IN THE DATABASE */}
        <div className="flex pt-2 space-x-1 align-middle items-center ">
          {serverMessage && (
            <>
              <BsExclamationCircleFill className="h-4 w-4 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                {serverMessage}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <CreateButton />
        </div>
        <p>
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-500 hover:text-blue-600 focus:text-blue-700">
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
}

function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-4 w-full bg-blue-600 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
      aria-disabled={pending}
      type="submit"
    >
      <span className="flex items-center">Create Account</span>
    </button>
  );
}
