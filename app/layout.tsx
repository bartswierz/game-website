import "./globals.css";
import { Inter } from "next/font/google";
import { Footer, Navbar, Sidebar } from "@/components/ui";

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
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        {/* Navigation Component here */}
        <Navbar />
        <div className="flex flex-row relative">
          {/* <div className="w-72">
            <Sidebar />
          </div> */}

          <main className="p-5 md:ml-72">{children}</main>
        </div>

        {/* FOOTER */}
        <Footer />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
