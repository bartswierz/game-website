import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({})], //used for authentication with 'username' and 'password'. We can add more providers here in the future, OAuth or email providers
});
