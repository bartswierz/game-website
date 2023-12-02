"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import type { User } from "@/types/index";

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

//TODO - add a function to check if the email already exists in the database
// export async function createAccount(formData: FormData) {
export async function createAccount(formData: FormData) {
  // TODO - error from FormData being undefined as it is passed
  // console.log("formData: ", formData);
  // const form = Object.fromEntries(formData);
  // console.log("form: ", form);
  if (formData !== undefined) {
    try {
      console.log("inside create account, data passed: ", formData);
      // const { email, password, name } = CreateAccount.parse({
      const form = Object.fromEntries(formData);
      console.log("form: ", form);

      // TODO - uncomment once fixed
      // const { email, password, name } = CreateAccount.parse({
      const { email, password, name } = CreateAccount.parse({
        name: formData.get("name"), //Bart
        email: formData.get("email"), //test@email.com
        password: formData.get("password"), //123456
        // name: form.get("name"), //Bart
        // email: form.get("email"), //test@email.com
        // password: form.get("password"), //123456
      });

      console.log("email: ", email);
      console.log("password:", password);
      console.log("name:", name);

      //******************* */

      // UNCOMMENT AFTER TESTING
      console.log(`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`);
      // PLACE USER DATA INTO DATABASE IF IT DOESNT ALREADY EXIST
      await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
    } catch (error) {
      // Error is getting undefined for our form data
      console.log("error trying to create account: ", error, "\n");
      if ((error as Error).message.includes("CredentialsSignin")) {
        return "CredentialSignin";
      } else if ((error as Error).message.includes("duplicate key value")) {
        console.log("duplicate key value"); //THIS ERROR DISPLAYS ON DUPLICATE EMAIL ALREADY IN USER TABLE
        return "duplicate key value";
      } else if ((error as Error).message.includes("unique constraint")) {
        console.log("unique constraint");
        return "unique constraint";
      } else if ((error as Error).message.includes("already exists")) {
        console.log("already exists");
        return "alreadyExists";
      } else if ((error as Error).message.includes("users_email_key")) {
        console.log("users_email_key unique constraint");
        return "users_email_key";
      }
      throw error;
    }
    revalidatePath("/signup");
    redirect("/login"); //commented out as it currently is requesting multiple times
  }
}

// const date = new Date().toISOString().split("T")[0]; //Creates a date string in the format YYYY-MM-DD for account creation

/*
    const alreadyExists = await sql<User>`SELECT * from USERS where email=${email}`;
    // console.log("alreadyExists: ", alreadyExists);
    if (alreadyExists) {
      console.log("account with this email already exists");
      // return null;
      return "alreadyExists";
      // return new Error("Email already exists");
    }
    */
// try {
// INSERT INTO invoices (email, password, name, date)
// VALUES (${email}, ${password}, ${name}, ${date})
// if user exists, return error
