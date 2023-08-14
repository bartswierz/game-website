"use client";
import { BrandLogo, HamburgerMenu, Searchbar } from "@/components/ui";

//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  return (
    <header>
      <nav className="flex flex-row w-full items-center bg-gray-900 p-4 shadow text-white font-bold">
        <BrandLogo />
        <Searchbar />
        <HamburgerMenu />
      </nav>
    </header>
  );
};

export default Navbar;
