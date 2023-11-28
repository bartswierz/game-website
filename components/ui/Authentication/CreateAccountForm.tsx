"use client";

// import { lusitana } from "@/app/ui/fonts";
// import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import { Button } from "./button";

// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiLogIn, BiArrowBack } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";

// import { experimental_useFormStatus as useFormState, experimental } from "react-dom";
// import { experimental_useFormState as useFormState } from "react-dom";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import { createAccount } from "@/lib/actions";
import Link from "next/link";
import { FormEvent } from "react";

export default function CreateAccountForm() {
  // Using useFormState to CALL THE SERVER ACTION and HANDLE FORM ERRORS, and useFormStatus to handle the pending state of the form
  // const [code, action] = useFormState(authenticate, undefined); //replace authenticate with createAccount
  // const [code, action] = useFormState(createAccount, undefined); //replace authenticate with createAccount
  const [state, dispatch] = useFormState(createAccount, undefined); //replace authenticate with createAccount
  console.log("state", state);
  console.log("dispatch", dispatch);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside handle submit");
    console.log("event: ", event);
    // const formData: FormData = new FormData(event.currentTarget); // or event.target
    // const formData: FormData = new FormData(event); // or event.target
    // console.log("formData type: ", typeof formData);
    // const data = Object.fromEntries(formData.entries());
    // dispatch(createAccount(data)); // Assuming dispatch correctly calls your action
    // dispatch(createAccount(formData)); // Assuming dispatch correctly calls your action
  };
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("inside handle submit");
  // // };
  // const DemoAccountCredentials = () => {
  //   {
  //     /* DEMO CREDENTIALS */
  //   }
  //   return (
  //     <div className="divide-double border-t-2 border-gray-500 mt-2 pt-2 text-gray-500">
  //       <span className="underline font-semibold">Demo Account</span>
  //       <p>
  //         Email: <b>user@nextmail.com</b>
  //       </p>
  //       <p>
  //         Password: <b>123456</b>
  //       </p>
  //     </div>
  //   );
  // };

  return (
    // <form action={action} className="space-y-3 text-white m-2 w-[280px]- w-full max-w-[98vw] md:w-[400px] relative">
    // <form action={action} className="space-y-3 text-white m-2 w-[280px]- w-full max-w-[98vw] md:w-[400px] relative">
    <form
      onSubmit={handleSubmit}
      action={dispatch}
      className="space-y-3 text-white m-2 w-[280px]- w-full max-w-[98vw] md:w-[400px] relative"
    >
      {/* // <form action={createAccount} className="space-y-3 text-white m-2 w-full max-w-[98vw] md:w-[400px] relative"> */}
      <div className="flex-1 rounded-lg bg-gray-50- px-6 pb-4 pt-8 bg-slate-900 drop-shadow-2xl shadow-2xl">
        <h1 className={`mb-3 text-2xl w-full text-center font-bold`}>Next-Level Games</h1>
        <div className="w-full">
          {/* Name */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900-" htmlFor="password">
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
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
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
        {/* TODO - add different conditional to check if userExists display message "User already exists" */}
        <div className="flex h-8 items-end- space-x-1 align-middle items-center bg-blue-500 text-white">
          {/* {code === "alreadyExists" && ( */}
          {dispatch === "alreadyExists" && (
            <>
              <BsExclamationCircleFill className="h-4 w-4 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Account with this email already exists
              </p>
            </>
          )}
          {/* {code === "CredentialSignin" && ( */}
          {dispatch === "CredentialSignin" && (
            <>
              <BsExclamationCircleFill className="h-4 w-4 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials2
              </p>
            </>
          )}
          <span>State:{state}</span>
          {/* ORIGINAL */}
          {/* {code === "CredentialSignin" && (
            <>
              <BsExclamationCircleFill className="h-4 w-4 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )} */}
        </div>
        <div className="flex flex-col gap-4 mb-4">
          {/* <LoginButton /> */}
          <CreateButton />

          {/* <Link
            href={"/"}
            className="bg-gray-500 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-gray-600 transition-colors duration-300"
          >
            <span className="flex items-center gap-0.5">
              <BiArrowBack />
              Back
            </span>
          </Link> */}
        </div>
        <p>
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-500 hover:text-blue-600 focus:text-blue-700">
            Back to Login
          </Link>
        </p>
        {/* <DemoAccountCredentials /> */}
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

function CreateButton() {
  const { pending } = useFormStatus();

  /* Log in */
  return (
    <button
      className="mt-4 w-full bg-blue-600 flex text-center justify-center items-center rounded-sm py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
      aria-disabled={pending}
      type="submit"
    >
      <span className="flex items-center">
        Create Account
        {/* <BiLogIn className="ml-auto h-5 w-5 text-gray-50" /> */}
      </span>
    </button>
  );
}
