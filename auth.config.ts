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
      // console.log("auth.user: ", auth?.user);

      const isOnAllowedPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/signup";
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); //may have to update dashboard path

      if (isOnDashboard && !isLoggedIn) {
        // Redirect unauthenticated users trying to access dashboard pages to login page(ex. modifying the url to http://localhost:3000/dashboard will redirect to http://localhost:3000/login)
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isLoggedIn && !isOnDashboard) {
        // Redirect authenticated users to the dashboard only if they are not already there - (ex. user has created an account OR user has logged in, and they are trying to access the login page, so we redirect them to the dashboard page)
        return Response.redirect(new URL("/dashboard", nextUrl));
      } else if (isOnAllowedPage) {
        // Always allow access to 'login' and 'signup' pages
        return true;
      } else if (!isLoggedIn) {
        // Redirect unauthenticated users not trying to access dashboard to login page
        return Response.redirect(new URL("/login", nextUrl));
      }

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
