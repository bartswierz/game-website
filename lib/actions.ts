"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
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

//Connecting auth logic with our login form
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

const AccountSchema = z.object({
  id: z.string(),
  // profileName: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  // date: z.string(),
});

// const CreateAccount = AccountSchema.omit({ id: true, date: true });
const CreateAccount = AccountSchema.omit({ id: true });

export async function createAccount(formData: FormData) {
  console.log("inside create account, data passed: ", formData);
  const { email, password, name } = CreateAccount.parse({
    name: formData.get("name"), //Bart
    email: formData.get("email"), //test@email.com
    password: formData.get("password"), //123456
  });

  console.log("email: ", email);
  console.log("password", password);
  console.log("name", name);
  // const date = new Date().toISOString().split("T")[0]; //Creates a date string in the format YYYY-MM-DD for account creation

  // try {
  // INSERT INTO invoices (email, password, name, date)
  // VALUES (${email}, ${password}, ${name}, ${date})
  await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
  // } catch (error) {
  //   console.error("Error creating account: ", error);
  // }
  revalidatePath("/signup");
  redirect("/login"); //commented out as it currently is requesting multiple times
}
