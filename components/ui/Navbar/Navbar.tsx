"use client";

import { useState } from "react";
import { BrandLogo, HamburgerMenu, Searchbar } from "@/components/ui";
import { signOut } from "@/auth";
import { useRouter } from "next/navigation";
import { VscHome } from "react-icons/vsc";
import Link from "next/link";
import SidebarMobile from "../Sidebar/SidebarMobile";

//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  const router = useRouter(); //will be used to on SIGNOUT to give a clean url back to /login without the added callback url params
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login"); //cleans up our route to localhost:3000/login
  };

  const LogoutButton = () => {
    return (
      <form action={handleSignOut} className="hidden md:block">
        <button className="flex gap-2 bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 focus:bg-blue-800 transition-colors duration-300 shadow-lg text-sm">
          Sign Out
        </button>
      </form>
    );
  };

  const HomeButton = () => {
    return (
      <Link href={"/dashboard"} className="hidden md:block">
        <button className="flex items-center justify-center">
          <VscHome size={32} className="hover:text-gray-400 transition-color duration-200 ease-in " />
        </button>
      </Link>
    );
  };

  return (
    <header>
      <nav className="flex xsm:flex-row flex-col w-full items-center bg-gray-900 p-4 shadow text-white font-bold">
        <BrandLogo />
        <div className="pl-2 xsm:hidden md:block">Next-Level Games</div>
        <div className="flex items-center gap-2 justify-between w-full">
          <Searchbar />
          <HomeButton />
          <HamburgerMenu isMenuOpen={isMenuOpen} closeMenuCallback={closeMenu} />
          <LogoutButton />
        </div>
        {/* Sidebar Navigation will display when user clicks on the hamburger menu */}
        <SidebarMobile isMenuOpen={isMenuOpen} closeMenuCallback={closeMenu} />
      </nav>
    </header>
  );
};

export default Navbar;
