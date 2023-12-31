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
import { set } from "lodash";

interface SidebarMobileProps {
  isMenuOpen: boolean;
  closeMenuCallback: () => void;
}

interface PlatformListProps {
  closeMenuCallback: () => void;
}

const SidebarMobile = ({ closeMenuCallback, isMenuOpen }: SidebarMobileProps) => {
  // const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<string | null>(null);
  // const [windowWidth, setWindowWidth] = useState<number>(0);
  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  // Display the list of all platforms available(51 options)
  const PlatformList = ({ closeMenuCallback }: PlatformListProps) => {
    // const PlatformList = (closeMenuCallback: PlatformType) => {
    return (
      <ul className="text-white">
        <span>Platforms</span>
        {sidebarPlatformData.map((platformLinkData) => {
          // Dropdown Link
          if (platformLinkData.linkList) {
            const [{ linkID }] = platformLinkData.linkList;

            return (
              <SidebarDropdown pathname="platforms" linkData={platformLinkData} closeMenuCallback={closeMenuCallback} key={linkID} />
            );
          }

          // Single Link
          else
            return (
              <SidebarLink
                pathname="platforms"
                linkData={platformLinkData}
                closeMenuCallback={closeMenuCallback}
                key={platformLinkData.linkID}
              />
            );
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
        className="absolute top-3 left-[-2px] text-start bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 transition-color duration-200 text-sm border-2 border-gray-300 hover:border-white shadow-md rounded-sm"
      >
        <button className="flex grow items-center justify-center gap-2 px-1 py-1 text-sm font-medium md:flex-none md:justify-start text-gray-300 hover:text-white">
          <BiLogOut size={22} />
        </button>
      </form>
    );
  };

  const closeMenu = () => {
    closeMenuCallback(); //closeMenuCallback is a function passed down from HamburgerMenu.tsx to close our sidebar
  };

  const handleClick = (link: string) => {
    closeMenuCallback(); //Callback function back to Navbar to close sidebar
    setIsActive(link);
  };

  if (!isMenuOpen) return null;

  return (
    <>
      {
        // ADDS BLACK BACKGROUND OPACITY WHEN USER OPENS UP THE SIDEBAR, CLICKING ANYWHERE OUTSIDE THE SIDEBAR WILL REMOVE IT AND CLOSE THE SIDEBAR
        isMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black transition-opacity opacity-80 z-30" onClick={closeMenu}></div>
        )
      }

      <aside
        /* translate-x-0 -> Slides the sidebar to the left OFF SCREEN
          -translate-x-full -> Slides the sidebar to the right ON SCREEN*/
        className={`w-60 md:w-60 z-40 pb-10 md:pb-0 h-full transition-transformX transition-all duration-300 translate-x-0 bg-gray-900 ease-in-out
          ${isMenuOpen ? "-translate-x-full fixed top-0 left-0" : ""}`}
        aria-label="Sidebar"
      >
        <div className={`w-60 h-full md:h-[85vh] px-3 overflow-y-auto bg-gray-900X pb-8`}>
          {
            //DISPLAYS THE LOGO WITHIN SIDEBAR
            <div className="relative flex flex-col justify-center items-center text-white font-bold text-xl pb-4 pt-6">
              <BrandLogo />
              <span>Next-Level Games</span>
              <div className="absolute top-1 right-[-0.625rem] ">
                <HamburgerMenu isMenuOpen={isMenuOpen} closeMenuCallback={closeMenuCallback} />
                {/* <HamburgerMenu /> */}
              </div>
              <LogoutButton />
            </div>
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
                      // setIsActive(link);
                      handleClick(link);
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
            <PlatformList closeMenuCallback={closeMenuCallback} />

            {/* GENRES LINKS */}
            <ul>
              <span className="text-xl text-white">Genres</span>
              {genres.linkList.map(({ genre, id }) => (
                <li key={id}>
                  <Link
                    href={{ pathname: `/dashboard/genres/${genre}`, query: { genres: id } }}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800  group"
                    onClick={() => {
                      // setIsActive(genre);
                      handleClick(genre);
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

export default SidebarMobile;
