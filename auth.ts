"use server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials"; //The Credentials provider allows users to log in with a username and a password.
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/types/index";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
// Queries the user table in our database and returns the user object if it exists
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    // console.log("selecting user - value row: ", user.rows[0]);
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
    /* 
    1. Checks to see if the credentials are valid types using ZOD BEFORE checking if the USER EXISTS IN THE DATABASE
    2. Compare password(user input password) and user.password(Inside DB) 
    3. If the passwords match, we return the user object otherwise null(if no match is found to PREVENT USER FROM LOGGING IN)
    */
    Credentials({
      async authorize(credentials) {
        //Checking to see if the credentials given from the user are valid types
        // parsedCredentials === USER INPUT VALIDATION
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        // console.log("parsedCredentials", parsedCredentials);

        // If the credentials are valid, we will pass the email to our getUser function to query the database
        if (parsedCredentials.success) {
          // console.log("credentials are valid time to compare passwords...");
          const { email, password } = parsedCredentials.data;

          // user === DATABASE QUERY CHECKING TO FIND A EMAIL MATCH
          const user = await getUser(email);

          // If no match is found, we return null
          if (!user) return null;

          // TODO - fix bcrypt.compare by updating database password stored into a hashed password, this should then work correctly
          // Compare the password provided to the password in the database; password = user input, user.password = stored database password
          // const passwordsMatch = await bcrypt.compare(password, user.password);

          // console.log("password: ", password);
          // console.log("user.password: ", user.password);
          const passwordMatches = password === user.password ? true : false;
          console.log("passwordMatches? ", passwordMatches);

          // console.log("password passed: ", password, "& type of password: ", typeof password);
          // console.log("user.password in database: ", user.password, "& type of user.password: ", typeof user.password);
          // passwordsMatch ? console.log("passwords match") : console.log("passwords do not match");

          // If the passwords match, we return the user object
          // if (passwordsMatch) return user;
          // TODO - need to redirect user back to home page after successful login
          if (passwordMatches) {
            console.log("SUCCESS! WE HAVE A PASSWORD MATCH! returning user: ", user);
            // return user, redirect('/login');
            // redirect('/login');
            // return {user, redirect('/')};
            // Response.redirect(new URL("/", nextUrl));
            // Response.redirect(new URL("/", "http://localhost:3000"));
            return user; //user is confirmed, return user
            // redirect("/dashboardTest");
            // return {user, redirect({destination: '/dashboardtest', permanent: false}})};
          }
        }

        console.log("Invalid credentials");
        // Invalid credentials, return null
        return null; //prevents the user from logging in
      },
    }),
  ], //used for authentication with 'username' and 'password'. We can add more providers here in the future, OAuth or email providers
});
