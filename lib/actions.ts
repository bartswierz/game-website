"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import type { User } from "@/types/index";
import { auth } from "@/auth";
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
//TODO - add a function to check if the email already exists in the database
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    //ORIGINAL
    await signIn("credentials", Object.fromEntries(formData));

    console.log("User authentication was successful, redirecting to the dashboard page");
    redirect("/dashboard");
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      console.log("error.type: CredentialsSignin");
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

//TODO - add a function to check if the email already exists in the database
// export async function createAccount(formData: FormData) {
export async function createAccount(formData: FormData) {
  // TODO - error from FormData being undefined as it is passed
  if (formData !== undefined) {
    try {
      console.log("Form Data Passed: ", formData);
      const form = Object.fromEntries(formData);
      console.log("form: ", form);

      const { email, password, name } = CreateAccount.parse({
        name: formData.get("name"), //Bart
        email: formData.get("email"), //test@email.com
        password: formData.get("password"), //123456
      });

      // PLACE USER DATA INTO DATABASE IF IT DOESNT ALREADY EXIST
      await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
    } catch (error) {
      // Error is getting undefined for our form data
      console.log("error trying to create account: ", error, "\n");

      if ((error as Error).message.includes("duplicate key value")) {
        console.log("duplicate key value"); //THIS ERROR DISPLAYS ON DUPLICATE EMAIL ALREADY IN USER TABLE
        return "An account with this email already exists.";
      }
      return `Invalid Email`;
    }
    revalidatePath("/signup");
    redirect("/login"); //commented out as it currently is requesting multiple times
  }
}

export const addGameToFavorites = async () => {
  const user = await auth();
  console.log("addGameToFavorites - user: ", user);
};
