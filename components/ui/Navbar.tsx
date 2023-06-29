const Navbar = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between bg-gray-900 p-4 border-b-1 border-slate-800 shadow text-white font-bold">
        <span className="cursor-pointer hover:text-gray-300">Legendary Games</span>
        <div className="flex gap-8 bg-green-3005">
          <h1 className="cursor-pointer hover:text-gray-300">NavItem #1</h1>
          <h1 className="cursor-pointer hover:text-gray-300">NavItem #2</h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
