import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar, Sidebar } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        {/* Navigation Component here */}
        <Navbar />
        <div className="flex border w-full">
          <Sidebar />
          <main className=" p-5">{children}</main>
        </div>
        {/* Footer Component here */}
      </body>
    </html>
  );
}
