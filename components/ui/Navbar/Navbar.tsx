"use client";
import { BrandLogo, HamburgerMenu, Searchbar } from "@/components/ui";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { signOut } from "@/auth";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  // Get the isSidebarOpen value from redux store to hide hamburger menu when sidebar is open
  const isSidebarOpen: boolean = useAppSelector(({ sidebarSlice }) => sidebarSlice.value.isSidebarOpen);
  const router = useRouter(); //will be used to on SIGNOUT to give a clean url back to /login without the added callback url params

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login"); //cleans up our route to localhost:3000/login
  };

  const LogoutComponent = () => {
    return (
      <form action={handleSignOut} className="hidden md:block">
        <button className="flex gap-2 bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 focus:bg-blue-800 transition-colors duration-300 shadow-lg">
          {/* <BiLogOut size={24} /> */}
          Sign Out
        </button>
      </form>
    );
  };

  return (
    <header>
      <nav className="flex flex-row w-full items-center bg-gray-900 p-4 shadow text-white font-bold">
        <BrandLogo />
        <Searchbar />
        {/* Hides menu icon when sidebar is opened */}
        {isSidebarOpen ? <div className="w-10 h-10"></div> : <HamburgerMenu />}
        <LogoutComponent />
        {/* {isSidebarOpen ? null : <Link href={"/login"}>Sign In</Link>} */}
      </nav>
    </header>
  );
};

export default Navbar;
