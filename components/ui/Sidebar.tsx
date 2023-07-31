"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarLink } from "@/components/ui";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  // Used to remove the sidebar width when the viewport is under 768px
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Add event listener to update windowWidth when the viewport is resized
    window.addEventListener("resize", handleResize);
    // Initial value of windowWidth
    setWindowWidth(window.innerWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // // Function to check if the sidebar should be hidden based on the window width
  const isSidebarHidden = windowWidth < 768;

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  const handleSidebarToggle = () => {
    console.log("inside handleSidebarToggle - PREVIOUS STATE: isSidebarOpen: ", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
    //   if (!isSidebarOpen) return <div className="text-white border bg-red-500">isSideBarOpen: {isSidebarOpen}</div>;
    // else (isSidebarOpen) return <div className="text-white border bg-green-500">isSideBarOpen: {isSidebarOpen}</div>;
  };
  // If the windowWidth is less than 768px, return null to remove the div off the page to give all space to the main content
  // if (!isSidebarOpen) return null;

  // if (isSidebarHidden) return null;
  // if (isSidebarHidden) return <div>N\A</div>;

  return (
    <>
      {/* HAMBURGER BUTTON */}
      {/* TODO - turn this button into a fixed position - ADD a conditional state check to see if isSidebarOpen */}
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="fixed top-0 right-5 inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={handleSidebarToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {/* SIDEBAR CONTENT */}
      {/* {isSidebarHidden ? null : ( */}
      {isSidebarOpen ? (
        <aside
          id="sidebar-multi-level-sidebar"
          // className="fixed top-0 left-0 z-40 w-[18%] h-screen transition-transform -translate-x-full sm:translate-x-0 "
          //   className={`w-60 md:w-60 z-40 h-screen transition-transform
          // ${isSidebarOpen ? "-translate-x-full" : ""} sm:translate-x-0`}
          className={`w-60 md:w-60 z-40 h-screen transition-transform
        ${isSidebarOpen ? "-translate-x-full" : "sm:translate-x-0"} translate-x-0`}
          // ${isSidebarOpen ? "transition-transform -translate-x-full sm:translate-x-0" : ""} `}
          // -translate-x-full -> Slides the sidebar to the right ON SCREEN
          // TODO - add the -translate-x-full case when user clicks the button on the navbar
          // translate-x-0 -> Slides the sidebar to the left OFF SCREEN
          aria-label="Sidebar"
        >
          <div className="w-60 h-full px-3 pb-4 overflow-y-auto bg-gray-900 ">
            {/* LINKS - EACH LINK ROUTES TO A DYNAMIC PAGE */}
            <ul className="space-y-2 font-medium">
              {/* BROWSE LINKS */}
              <ul>
                <span className="text-xl text-white">Browse</span>
                {browse.linkList.map((link) => (
                  <li key={link}>
                    <Link
                      href={{ pathname: `/${browse.title}/${link}` }}
                      // className="flex gap-2"
                      className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800 group"
                      onClick={() => setIsActive(link)}
                      key={link}
                    >
                      {/* <span className="w-6 h-6 bg-slate-500  rounded-md"></span> */}
                      <IoGameControllerOutline />
                      <span className={`ml-3 cursor-pointer ${link === isActive ? "text-white font-bold" : ""}`}>
                        {capitalizeWord(link)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* PLATFORMS LINKS */}
              <ul>
                {/* Passing uid to differentiate dropdown open actions for each dropdown */}
                <span className="text-xl text-white">Platforms</span>
                <SidebarLink pathname={"platforms"} linkTitle={"PC"} linkObj={pc} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"Xbox"} linkList={xbox} uid={1} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"Playstation"} linkList={playstation} uid={2} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"Nintendo"} linkList={nintendo} uid={3} />
                <SidebarLink pathname={"platforms"} linkTitle={"iOS"} linkObj={iOS} />
                <SidebarLink pathname={"platforms"} linkTitle={"Android"} linkObj={android} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"macOS"} linkList={macOS} uid={4} />
                <SidebarLink pathname={"platforms"} linkTitle={"Linux"} linkObj={linux} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"Atari"} linkList={atari} uid={5} />
                <SidebarLink pathname={"platforms"} linkTitle={"Commodore"} linkObj={commodore} />
                <SidebarDropdown pathname={"platforms"} linkTitle={"SEGA"} linkList={SEGA} uid={6} />
              </ul>

              {/* GENRES LINKS */}
              <ul>
                <span className="text-xl text-white">Genres</span>
                {genres.linkList.map((link) => (
                  <li key={link}>
                    <Link
                      href={{ pathname: `/${genres.title}/${link}`, query: { genres: link } }}
                      // className="flex gap-2"
                      className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800  group"
                      onClick={() => setIsActive(link)}
                      key={link}
                    >
                      {/* <span className="w-6 h-6 bg-slate-500 rounded-md"></span> */}
                      <IoGameControllerOutline />
                      <span className={`ml-3 cursor-pointer ${link === isActive ? "text-white font-bold" : ""}`}>
                        {capitalizeWord(link)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default Sidebar;
