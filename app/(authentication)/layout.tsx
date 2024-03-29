import "@/app/globals.css";
import { Metadata } from "next";
import Image from "next/image";
import RacingImage from "@/public/static/RacingImage.png";

export const metadata: Metadata = {
  title: {
    template: "Next-Level Games | %s", // %s is the page title that will be replaces with the custom title given
    default: "Next-Level Games",
  },
  description: "The only game information hub you will ever need to get to the Next-Level.",
};

//Reference for multiple layouts used: https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-gray-900`}>
        <main className="flex justify-center items-center w-screen h-screen relative">
          {children}
          <Image
            src={RacingImage}
            sizes="100vw"
            alt="Racing Cars moving at a rapid pace - Image rendered by ChatGPT - DALL-E"
            fill
            className="absolute z-[-1] bg-gradient-to-r from-indigo-500 opacity-20 object-cover w-screen h-screen"
            priority
          />
        </main>
      </body>
    </html>
  );
}
