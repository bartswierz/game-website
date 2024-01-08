"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarLink, BrandLogo, HamburgerMenu } from "@/components/ui";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/auth"; //server action to sign user out
import { sidebarPlatformData } from "@/constants";
import { SidebarLinkProps } from "@/types";

const Sidebar = () => {
  // const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<string | null>(null);
  // const [windowWidth, setWindowWidth] = useState<number>(0);
  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // PASSED DOWN TO SidebarLink & SidebarDropdown as a callback function to update activeLink and close sidebar if on mobile screen
  const handleLinkCallback = (link: string) => {
    //Adds bold text to active link
    setIsActive(link);

    //Closes if user is on mobile screen
    // handleSidebar(windowWidth);
  };

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  const handleCloseSidebar = () => {
    // setisMenuOpen(false);
    setIsMenuOpen(false);
  };

  // Display the list of all platforms available(51 options)
  const PlatformList = () => {
    return (
      <ul className="text-white">
        <span>Platforms</span>
        {sidebarPlatformData.map((platformLinkData) => {
          // Dropdown Link
          if (platformLinkData.linkList) {
            const [{ linkID }] = platformLinkData.linkList;

            return <SidebarDropdown pathname="platforms" linkData={platformLinkData} key={linkID} />;
          }

          // Single Link
          else return <SidebarLink pathname="platforms" linkData={platformLinkData} key={platformLinkData.linkID} />;
        })}
      </ul>
    );
  };

  // Sign user out by calling the server action, 'signOut' inside auth
  const LogoutButton = () => {
    return (
      <form
        action={async () => {
          // "use server";
          await signOut();
        }}
        className="absolute top-3 left-[-2px] text-start bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 transition-color duration-200 text-sm border-2 border-gray-300 hover:border-white hover:shadow-white shadow-md rounded-sm"
      >
        <button className="flex grow items-center justify-center gap-2 px-1 py-1 text-sm font-medium md:flex-none md:justify-start text-gray-300 hover:text-white">
          <BiLogOut size={22} />
        </button>
      </form>
    );
  };

  return (
    <>
      {
        // ADDS BLACK BACKGROUND OPACITY WHEN USER OPENS UP THE SIDEBAR, CLICKING ANYWHERE OUTSIDE THE SIDEBAR WILL REMOVE IT AND CLOSE THE SIDEBAR
        isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black transition-opacity opacity-80 z-30"
            onClick={handleCloseSidebar}
          ></div>
        )
      }

      <aside
        /* translate-x-0 -> Slides the sidebar to the left OFF SCREEN
          -translate-x-full -> Slides the sidebar to the right ON SCREEN*/
        className={`w-60 md:w-60 z-40 pb-10 md:pb-0 h-full transition-transform block translate-x-0 bg-gray-900
        ${isMenuOpen ? "-translate-x-full fixed top-0 left-0" : ""}`}
        aria-label="Sidebar"
      >
        <div className={`w-60 h-full md:h-[85vh] px-3 overflow-y-auto bg-gray-900X pb-8`}>
          {
            //DISPLAYS THE LOGO WITHIN SIDEBAR
            isMenuOpen && (
              <div className="relative flex flex-col justify-center items-center text-white font-bold text-xl pb-4 pt-6">
                <BrandLogo />
                <span>Next-Level Games</span>
                <div className="absolute top-1 right-[-0.625rem] ">
                  {/* <HamburgerMenu isMenuOpen={isMenuOpen} /> */}
                  {/* <HamburgerMenu /> */}
                </div>
                <LogoutButton />
              </div>
            )
          }
          {/* LINKS - EACH LINK ROUTES TO A DYNAMIC PAGE */}
          <ul className="space-y-2 font-medium">
            {/* BROWSE LINKS */}
            <ul>
              <span className="text-xl text-white">Browse</span>
              {browse.linkList.map((link) => (
                <li key={link}>
                  <Link
                    href={{ pathname: `/dashboard/${browse.title}/${link}` }}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800 group"
                    onClick={() => {
                      setIsActive(link);
                    }}
                    key={link}
                  >
                    <IoGameControllerOutline />
                    {/* IF ACTIVE, LINK HAS BOLD TEXT */}
                    <span className={`ml-3 cursor-pointer ${link === isActive ? "text-white font-bold" : "text-gray-300"}`}>
                      {capitalizeWord(link)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Platform List */}
            <PlatformList />

            {/* GENRES LINKS */}
            <ul>
              <span className="text-xl text-white">Genres</span>
              {genres.linkList.map(({ genre, id }) => (
                <li key={id}>
                  <Link
                    href={{ pathname: `/dashboard/genres/${genre}`, query: { genres: id } }}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800  group"
                    onClick={() => {
                      setIsActive(genre);
                    }}
                    key={id}
                  >
                    <IoGameControllerOutline />
                    <span className={`ml-3 cursor-pointer ${genre === isActive ? "text-white font-bold" : ""}`}>
                      {capitalizeWord(genre)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
