import Link from "next/link";
import { Searchbar } from "@/components/ui";

const Navbar = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between items-center bg-gray-900 p-4 shadow text-white font-bold">
        <Link href="/" className="cursor-pointer hover:text-gray-300 w-52 text-xl">
          Next-Level Games
        </Link>

        <Searchbar />

        {/* <div className="border flex gap-8 bg-green-3005">
          <Link href="/" className="cursor-pointer hover:text-gray-300">
            NavItem #1
          </Link>
          <Link href="/" className="cursor-pointer hover:text-gray-300">
            NavItem #2
          </Link>
        </div> */}

        {/* TEMP DIV TO KEEP SEARCH BAR IN THE CENTER - NAV-ITEMS WILL BE ADDED IN FUTURE */}
        <div></div>
      </nav>
    </header>
  );
};

export default Navbar;
