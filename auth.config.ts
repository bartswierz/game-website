import type { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "./auth";
//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
//Callbacks: This will prevent users from accessing the dashboard/account-only restricted pages unless they are logged in.
export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login", //clicking on the login button will redirect to /login page route -> (http://localhost:3000/login)
  },
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (user) {
  //       // If the user is authenticated, redirect to the root URL
  //       return "/";
  //     }
  //     return false; // Return false to indicate a failed sign-in attempt
  //   },
  // },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); //may have to update dashboard path
  //     const isOnDashboard = nextUrl.pathname.startsWith("/"); //may have to update dashboard path
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       // return Response.redirect(new URL("/dashboard", nextUrl)); //may have to update dashboard path
  //       return Response.redirect(new URL("/", nextUrl)); //may have to update dashboard path
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;
