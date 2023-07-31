import "./globals.css";
import { Inter } from "next/font/google";
import { Footer, Navbar, Sidebar } from "@/components/ui";
import { ReduxProvider } from "@/redux/features/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css" rel="stylesheet" />
        <link rel="icon" type="image/svg" href="../app/SiteLogo.svg" sizes="32x32" />
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        {/* <ReduxProvider>{children}</ReduxProvider> */}
        {/* Wrapping children & layout components to have access to our REDUX STORE */}
        <ReduxProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="container p-5 border-4 w-full">{children}</main>
          </div>
          <Footer />
        </ReduxProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
