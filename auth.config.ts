import type { NextAuthConfig } from "next-auth";
//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
//Callbacks: This will prevent users from accessing the dashboard/account-only restricted pages unless they are logged in.
export const authConfig = {
  //This pages object will allow us to use OUR OWN CUSTOM LOGIN PAGE, otherwise if its not provided we will use the default nextjs sign-in, sign-out, error pages
  pages: {
    signIn: "/login", //clicking on the login button will redirect to /login page route -> (http://localhost:3000/login)
  },
  // THIS PREVENTS USERS FROM ACCESSING DASHBOARD PAGES UNLESS THEY ARE SIGNED IN
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      //User is not logged in yet, ONLY ALLOWED PAGES ARE "LOGIN" AND "SIGNUP"
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
  providers: [],
} satisfies NextAuthConfig;
