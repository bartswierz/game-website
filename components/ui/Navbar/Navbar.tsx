"use client";
import { BrandLogo, HamburgerMenu, Searchbar } from "@/components/ui";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";

//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  // Get the isSidebarOpen value from redux store to hide hamburger menu when sidebar is open
  const isSidebarOpen: boolean = useAppSelector(({ sidebarSlice }) => sidebarSlice.value.isSidebarOpen);

  return (
    <header>
      <nav className="flex flex-row w-full items-center bg-gray-900 p-4 shadow text-white font-bold">
        <BrandLogo />
        <Searchbar />
        {/* Hides menu icon when sidebar is opened */}
        {isSidebarOpen ? <div className="w-10 h-10"></div> : <HamburgerMenu />}
        {/* <Link href={"/login"}>Sign In</Link> */}
        <Link href={"/login"} className="hidden md:block">
          Sign In
        </Link>
        {/* {isSidebarOpen ? null : <Link href={"/login"}>Sign In</Link>} */}
      </nav>
    </header>
  );
};

export default Navbar;
