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
      // console.log("request { nextUrl }: ", nextUrl);
      const isLoggedIn = !!auth?.user;
      console.log("auth.user: ", auth.user);
      // console.log("isLoggedIn: ", isLoggedIn);
      // if (isLoggedIn) return true;
      // console.log("isLoggedIn: ", isLoggedIn);
      // console.log("auth: ", auth);
      const isOnAllowedPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/signup";
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); //may have to update dashboard path
      // console.log("nextUrl: ", nextUrl);
      // console.log("nextUrl.pathname: ", nextUrl.pathname);
      // const isOnDashboard = nextUrl.pathname.startsWith("/"); //may have to update dashboard path

      //TODO - issue here with too many redirects to /dashboard page when still trying to create account or login. Need to fix this before updating main branch
      //Prevents user from accessing the dashboard pages without being logged in(ex. user trying to change the url manually to bypass authorization example.com/dashboard
      // THIS ROUTE IS CORRECTLY NAVIGATING USER
      if (isOnDashboard && !isLoggedIn) {
        // Redirect unauthenticated users trying to access dashboard pages to login page
        console.log("#1 - isOnDashboard && !isLoggedIn - BUT NOT AUTHENTICATED, REDIRECTING TO /login");
        // return false;
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isOnAllowedPage) {
        console.log("#2 - isOnAllowedPage");
        // Always allow access to login and signup pages
        return true;
        // return false;
      } else if (isLoggedIn) {
        //TODO - problem is in here
        // Redirect authenticated users to the dashboard
        console.log("#3 - isLoggedIn - PROBLEM IS HERE REDIRECTING TOO MANY TIMES TO /dashboard");
        // return Response.redirect(new URL("/dashboard", nextUrl));
        // return true;
      } else if (!isLoggedIn && !isOnDashboard) {
        // return Response.redirect(new URL("/login", nextUrl));
        console.log("#4 - !isLoggedIn && !isOnDashboard - Stay on current page (login or signup page)");
        // return false;
        return Response.redirect(new URL("/login", nextUrl)); //redirect to login page to get authorized to access dashboard
      }

      console.log("outside of if statements, returning true...");
      // For all other cases, return true to allow access
      return true;
    },
  },
} satisfies NextAuthConfig;

//---------------------------
// PREVIOUS
// if (isOnDashboard) {
//   if (isLoggedIn) return true;
//   return false; // Redirect unauthenticated users to login page
// } else if (isLoggedIn) {
//   return Response.redirect(new URL("/dashboard", nextUrl)); //may have to update dashboard path
//   // return Response.redirect(new URL("/", nextUrl)); //may have to update dashboard path
//   // return Response.redirect(new URL("localhost:3000/", nextUrl)); //may have to update dashboard path
//   // return Response.redirect(new URL("/", nextUrl)); //may have to update dashboard path
// } else if (!isLoggedIn) return false;
// return true;
//---------------------------
