"use server";

import { signIn } from "@/auth";
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
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
