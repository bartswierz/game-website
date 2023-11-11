import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/types/index";
import bcrypt from "bcrypt";

//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
// Queries the user table in our database and returns the user object if it exists
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    console.log("selecting user - value row: ", user.rows[0]);
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //Checking to see if the credentials given from the user are valid types
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        console.log("parsedCredentials", parsedCredentials);

        // If the credentials are valid, we will pass the email to our getUser function to query the database
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // If no match is found, we return null
          if (!user) return null;

          // Compare the password provided to the password in the database; password = user input, user.password = database
          const passwordsMatch = await bcrypt.compare(password, user.password);

          console.log("password passed: ", password, "& type of password: ", typeof password);
          console.log("user.password in database: ", user.password, "& type of user.password: ", typeof user.password);
          passwordsMatch ? console.log("passwords match") : console.log("passwords do not match");

          // If the passwords match, we return the user object
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        // Invalid credentials, return null
        return null; //prevents the user from logging in
      },
    }),
  ], //used for authentication with 'username' and 'password'. We can add more providers here in the future, OAuth or email providers
});
