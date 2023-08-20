"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarLink, BrandLogo, HamburgerMenu } from "@/components/ui";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { closeSidebar, openSidebar, toggleSidebar } from "@/redux/features/sidebar-slice";

const Sidebar = () => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const dispatch = useDispatch();
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  //TODO - get the isSidebarOpen value from redux store
  const isSidebarOpen = useAppSelector((state) => state.sidebarSlice.value.isSidebarOpen);
  const isMenuToggled = useAppSelector((state) => state.sidebarSlice.value.isMenuToggled);

  /* SCENARIOS
   *#1 Mobile - Sidebar open, and width below 768px - CLOSE SIDEBAR
   *#2 Desktop - Sidebar closed, and width above 768px - OPEN SIDEBAR
   *#3 Mobile - Sidebar closed, and width below 768px - do nothing
   *#4 Desktop - Sidebar open, and width above 768px - do nothing
   */
  const handleSidebar = (windowWidth: number) => {
    const isMobile = windowWidth < 768;

    //MOBILE SCREEN < 768px
    if (isMobile) {
      if (isSidebarOpen) dispatch(closeSidebar());
      //do nothing
      else return;
    } //DESKTOP SCREEN >= 768px
    else {
      if (!isSidebarOpen) dispatch(openSidebar());
      //do nothing
      else return;
    }
  };

  // Used to remove the sidebar width when the viewport is under 768px
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Add event listener to update windowWidth when the viewport is resized
    window.addEventListener("resize", handleResize);
    // Initial value of windowWidth
    setWindowWidth(window.innerWidth);

    handleSidebar(windowWidth);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  // Checks if user is accessing the app via mobile, if it is on a mobile screen, then we will hide the sidebar
  useEffect(() => {
    if (windowWidth < 768) {
      dispatch(closeSidebar());
    }
  }, []);

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {
        // ADDS BLACK BACKGROUND OPACITY WHEN USER OPENS UP THE SIDEBAR, CLICKING ANYWHERE OUTSIDE THE SIDEBAR WILL REMOVE IT AND CLOSE THE SIDEBAR
        isMenuToggled && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30" onClick={handleCloseSidebar}></div>
      }

      <aside
        /* translate-x-0 -> Slides the sidebar to the left OFF SCREEN
          -translate-x-full -> Slides the sidebar to the right ON SCREEN*/
        className={`w-60 md:w-60 z-40 h-screen transition-transform block translate-x-0
        ${isMenuToggled && "-translate-x-full fixed top-0 left-0"}`}
        aria-label="Sidebar"
      >
        <div className={`w-60 h-full md:h-[85vh] px-3 overflow-y-auto bg-gray-900 pb-8 ${isMenuToggled && "pt-6- w-full-"}`}>
          {
            //DISPLAYS THE LOGO WITHIN SIDBAR
            isMenuToggled && (
              <div className="relative flex flex-col justify-center items-center text-white font-bold text-xl pb-4 pt-6">
                <BrandLogo />
                <span>Next-Level Games</span>
                <div className="absolute top-1 right-[-0.625rem] ">
                  <HamburgerMenu />
                </div>
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
                    href={{ pathname: `/${browse.title}/${link}` }}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800 group"
                    onClick={() => setIsActive(link)}
                    key={link}
                  >
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
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800  group"
                    onClick={() => setIsActive(link)}
                    key={link}
                  >
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
    </>
  );
};

export default Sidebar;
