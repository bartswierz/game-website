import type { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "./auth";
//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
//Callbacks: This will prevent users from accessing the dashboard/account-only restricted pages unless they are logged in.
export const authConfig = {
  providers: [],
  //This pages object will allow us to use OUR OWN CUSTOM LOGIN PAGE, otherwise if its not provided we will use the default nextjs sign-in, sign-out, error pages
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
  //************************************************ */
  // THIS PREVENTS USERS FROM ACCESSING DASHBOARD PAGES UNLESS THEY ARE SIGNED IN(WE WILL PLACE OUR ACCOUNT ONLY PAGE IN HERE LATER)
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("request {nextUrl}: ", nextUrl);
      const isLoggedIn = !!auth?.user;
      // if (isLoggedIn) return true;
      // console.log("isLoggedIn: ", isLoggedIn);
      console.log("auth: ", auth);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); //may have to update dashboard path
      console.log("nextUrl: ", nextUrl);
      console.log("nextUrl.pathname: ", nextUrl.pathname);
      // const isOnDashboard = nextUrl.pathname.startsWith("/"); //may have to update dashboard path
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl)); //may have to update dashboard path
        // return Response.redirect(new URL("localhost:3000/", nextUrl)); //may have to update dashboard path
        // return Response.redirect(new URL("/", nextUrl)); //may have to update dashboard path
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
