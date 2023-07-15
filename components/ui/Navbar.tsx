import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between bg-gray-900 p-4 border-b-1 border-slate-800 shadow text-white font-bold">
        <Link href="/" className="cursor-pointer hover:text-gray-300">
          Next-Level Games
        </Link>
        <div className="flex gap-8 bg-green-3005">
          <Link href="/" className="cursor-pointer hover:text-gray-300">
            NavItem #1
          </Link>
          <Link href="/" className="cursor-pointer hover:text-gray-300">
            NavItem #2
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
