import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/sidebar-slice";

const HamburgerMenu = () => {
  const dispatch = useDispatch();

  const isSidebarOpen: boolean = useAppSelector(({ sidebarSlice }) => sidebarSlice.value.isSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  {
    /* Hidden until viewport is under 768px due to 'md:hidden' */
  }
  return (
    <button
      // data-drawer-target="sidebar-multi-level-sidebar"
      // data-drawer-toggle="sidebar-multi-level-sidebar"
      // aria-controls="sidebar-multi-level-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2- ml-3- ml-1 text-sm text-white rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={handleToggleSidebar}
    >
      <span className="sr-only">Open sidebar</span>
      {isSidebarOpen ? (
        <div className="flex items-center justify-center w-6 h-6 text-2xl font-semibold">X</div>
      ) : (
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default HamburgerMenu;
