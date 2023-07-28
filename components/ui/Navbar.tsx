import Link from "next/link";
import { Searchbar, Sidebar } from "@/components/ui";
import { IoGameControllerOutline } from "react-icons/io5";
import { sidebarData } from "@/constants";
import SiteLogo from "@/public/SiteLogo.svg";
//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  return (
    <header>
      {/* GAME ICON */}
      <nav className="flex flex-row justify-between items-center bg-gray-900 p-4 shadow text-white font-bold">
        <Link href="/" className="cursor-pointer hover:text-gray-300 w-52 text-xl">
          Next-Level Games
        </Link>

        {/* SEARCH BAR - SEARCHES FOR GAMES WITH THOSE INCLUDED LETTERS - NOT EXACT GAME */}
        <Searchbar />
        <svg width="100" height="100" viewBox="0 0 100 100">
          <use xlinkHref={`/public/SiteLogo.svg`} />
        </svg>
        {/* HAMBURGER ICON & LEFT-ALIGNED SIDEBAR */}
        <Sidebar />
      </nav>
    </header>
  );
};

export default Navbar;
