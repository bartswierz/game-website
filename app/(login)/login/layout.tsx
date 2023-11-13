import "@/app/globals.css";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: {
    template: "Next-Level Games | %s", // %s is the page title that will be replaces with the custom title given
    default: "Next-Level Games",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

// TODO - add our custom image as the background
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
        {/* <link rel="icon" type="image/svg" href="../app/SiteLogo.svg" sizes="32x32" /> */}
      </head>
      <body className={`bg-gray-900`}>
        <main className="flex justify-center items-center w-screen h-screen">
          {children}
          <Image
            src={`/images/RacingImage.png`}
            alt="Racing Cars moving at a rapid pace - Image rendered by ChatGPT - DALL-E"
            fill
            className="z-[-1] bg-gradient-to-r from-indigo-500 opacity-40 "
            priority
            objectFit="cover"
          />
        </main>
      </body>
    </html>
  );
}
