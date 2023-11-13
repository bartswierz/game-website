"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

//Reference: https://vercel.com/docs/storage/vercel-postgres/quickstart
// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(['pending', 'paid']),
//   date: z.string(),
// });

//For now we will use a simple schema for the favorite & add more later once it is working
const favoriteSchema = z.object({
  name: z.string(),
  //id
  //date - time stamp
});

const loginSchema = z.object({
  //username
  //password
});

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    //ORIGINAL
    await signIn("credentials", Object.fromEntries(formData));
    // const success = await signIn("credentials", Object.fromEntries(formData));
    // console.log("success: ", success);
    // if (successful) {
    //   console.log("success! getting user data from signIn function");
    //   redirect("/dashboard");
    // }
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
