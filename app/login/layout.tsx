export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en">
    // <head>
    //   <link rel="preconnect" href="https://fonts.googleapis.com" />
    //   <link rel="preconnect" href="https://fonts.gstatic.com" />
    //   <link
    //     href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
    //     rel="stylesheet"
    //   />
    //   <link rel="icon" type="image/svg" href="../app/SiteLogo.svg" sizes="32x32" />
    // </head>
    // {/* <body className={`${inter.className} bg-gray-900`}> */}
    // <body className={`bg-gray-900`}>
    // {/* Wrapping children & layout components to have access to our REDUX STORE */}
    // <ReduxProvider>
    // <Navbar />
    <div className="flex justify-center items-center b">
      {/* <Sidebar /> */}
      {/* <main className="container mx-auto m-6 px-2 md:px-4 ">{children}</main> */}
      <div>Test</div>
    </div>
    // <Footer />
    // </ReduxProvider>
    // {/* </body> */}
    // {/* </html> */}
  );
}
