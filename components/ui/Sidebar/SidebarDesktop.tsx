"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarLink, BrandLogo, HamburgerMenu } from "@/components/ui";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { closeSidebar, openSidebar, toggleSidebar } from "@/redux/features/sidebar-slice";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/auth"; //server action to sign user out

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  //Get the isSidebarOpen & isMenuToggled value from redux store
  const isSidebarOpen = useAppSelector((state) => state.sidebarSlice.value.isSidebarOpen);
  const isMenuToggled = useAppSelector((state) => state.sidebarSlice.value.isMenuToggled);

  /* CLOSE/OPENS SIDEBAR DEPENDING ON WINDOW WIDTH AND IF SIDEBAR IS ALREADY OPEN/CLOSED
   *SCENARIOS
   *#1 Mobile - Sidebar open, and width below 768px - CLOSE SIDEBAR
   *#2 Mobile - Sidebar closed, and width below 768px - DO NOTHING
   *#3 Desktop - Sidebar closed, and width above 768px - OPEN SIDEBAR
   *#4 Desktop - Sidebar open, and width above 768px - DO NOTHING
   */
  const handleSidebar = (windowWidth: number) => {
    const isMobile = windowWidth < 768;

    //MOBILE SCREEN < 768px
    if (isMobile) {
      if (isSidebarOpen) dispatch(closeSidebar()); //#1
      //do nothing
      else return; //#2
    } //DESKTOP SCREEN >= 768px
    else {
      if (!isSidebarOpen) dispatch(openSidebar()); //#3
      //do nothing
      else return; //#4
    }
  };

  // PASSED DOWN TO SidebarLink & SidebarDropdown as a callback function to update activeLink and close sidebar if on mobile screen
  const handleLinkCallback = (link: string) => {
    //Adds bold text to active link
    setIsActive(link);

    //Closes if user is on mobile screen
    handleSidebar(windowWidth);
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
        isMenuToggled && (
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
        ${isMenuToggled ? "-translate-x-full fixed top-0 left-0" : ""}`}
        aria-label="Sidebar"
      >
        <div className={`w-60 h-full md:h-[85vh] px-3 overflow-y-auto bg-gray-900X pb-8`}>
          {
            //DISPLAYS THE LOGO WITHIN SIDEBAR
            isMenuToggled && (
              <div className="relative flex flex-col justify-center items-center text-white font-bold text-xl pb-4 pt-6">
                <BrandLogo />
                <span>Next-Level Games</span>
                <div className="absolute top-1 right-[-0.625rem] ">
                  <HamburgerMenu />
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
                    // onClick={() => setIsActive(link)}
                    onClick={() => {
                      setIsActive(link);
                      // CLOSES SIDEBAR AS WE ROUTE USER TO NEW PAGE IF USER IS ON MOBILE
                      handleSidebar(windowWidth);
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

            {/* PLATFORMS LINKS */}
            <ul>
              {/* Passing uid to differentiate dropdown open actions for each dropdown */}
              <span className="text-xl text-white">Platforms</span>
              <SidebarLink pathname={"platforms"} linkTitle={"PC"} linkObj={pc} handleLinkCallBack={handleLinkCallback} />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"Xbox"}
                linkList={xbox}
                handleLinkCallBack={handleLinkCallback}
                uid={1}
              />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"Playstation"}
                linkList={playstation}
                handleLinkCallBack={handleLinkCallback}
                uid={2}
              />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"Nintendo"}
                linkList={nintendo}
                handleLinkCallBack={handleLinkCallback}
                uid={3}
              />
              <SidebarLink pathname={"platforms"} linkTitle={"iOS"} linkObj={iOS} handleLinkCallBack={handleLinkCallback} />
              <SidebarLink pathname={"platforms"} linkTitle={"Android"} linkObj={android} handleLinkCallBack={handleLinkCallback} />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"macOS"}
                linkList={macOS}
                handleLinkCallBack={handleLinkCallback}
                uid={4}
              />
              <SidebarLink pathname={"platforms"} linkTitle={"Linux"} linkObj={linux} handleLinkCallBack={handleLinkCallback} />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"Atari"}
                linkList={atari}
                handleLinkCallBack={handleLinkCallback}
                uid={5}
              />
              <SidebarLink
                pathname={"platforms"}
                linkTitle={"Commodore"}
                linkObj={commodore}
                handleLinkCallBack={handleLinkCallback}
              />
              <SidebarDropdown
                pathname={"platforms"}
                linkTitle={"SEGA"}
                linkList={SEGA}
                handleLinkCallBack={handleLinkCallback}
                uid={6}
              />
            </ul>

            {/* GENRES LINKS TODO - fix RPG - role-playing-games-rpg is passed as a slug, need to replace it with RPG*/}
            <ul>
              <span className="text-xl text-white">Genres</span>
              {genres.linkList.map(({ genre, id }) => (
                <li key={id}>
                  <Link
                    href={{ pathname: `/dashboard/genres/${genre}`, query: { genres: id } }}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-gray-800  group"
                    onClick={() => {
                      setIsActive(genre);
                      handleSidebar(windowWidth);
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
