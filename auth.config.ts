import type { NextAuthConfig } from "next-auth";

//Reference: https://nextjs.org/learn/dashboard-app/adding-authentication
export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); //may have to update dashboard path
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl)); //may have to update dashboard path
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
