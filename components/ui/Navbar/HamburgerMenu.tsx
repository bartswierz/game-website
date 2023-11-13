import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/sidebar-slice";
import { GrClose } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";

const HamburgerMenu = () => {
  const dispatch = useDispatch();

  const isSidebarOpen: boolean = useAppSelector(({ sidebarSlice }) => sidebarSlice.value.isSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Hamburger Icon svg - created component for code reability
  function HamburgerIcon() {
    return (
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    );
  }

  return (
    <button
      type="button"
      className="rounded-full md:hidden p-2 mt-1 mr-1 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200- focus:ring-transparent dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={handleToggleSidebar}
    >
      {/* CLOSE ICON */}
      <span className="sr-only">Open sidebar</span>
      {isSidebarOpen ? <AiOutlineClose size={22} /> : <HamburgerIcon />}
    </button>
  );
};

export default HamburgerMenu;
