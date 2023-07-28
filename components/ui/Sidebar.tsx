"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarLink } from "@/components/ui";
import { useState } from "react";

const Sidebar = () => {
  const [isActive, setIsActive] = useState<string | null>(null);

  const { pc, xbox, playstation, iOS, android, macOS, linux, nintendo, atari, commodore, SEGA, browse, genres } = sidebarData;

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 ">
          {/* BRAND LOGO & LINK TO HOME */}
          <Link href="/" className="flex justify-center cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "60px", width: "60px" }}>
              <defs>
                <filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%">
                  <feFlood flood-color="rgba(255, 255, 255, 1)" result="flood"></feFlood>
                  <feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite>
                  <feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur>
                  <feOffset dx="0" dy="0" result="offset"></feOffset>
                  <feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite>
                </filter>
                <linearGradient id="caro-asercion-warlord-helmet-gradient-0" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0%" stop-color="#02a5f6" stop-opacity="1"></stop>
                  <stop offset="100%" stop-color="#0101d3" stop-opacity="1"></stop>
                </linearGradient>
                <linearGradient x1="0" x2="1" y1="0" y2="1" id="caro-asercion-warlord-helmet-gradient-1">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop>
                  <stop offset="100%" stop-color="#000000" stop-opacity="1"></stop>
                </linearGradient>
              </defs>
              <polygon
                points="256,494,18,256,256,18,494,256"
                fill="url(#caro-asercion-warlord-helmet-gradient-0)"
                stroke="#464646"
                stroke-opacity="1"
                stroke-width="18"
              ></polygon>
              <g transform="translate(0,-22)">
                <path
                  d="M267.9 330.5h-23.8L232 289.6l-63.8-19.8 1 39.4 41.9 47.3 16.1-14.3L239.4 484 130.2 361.8l19.4-58.2-10.4-125.2 23.1-9.8c18.4 71.3 73.1 96.4 73.1 96.4l20.6-28.9 20.6 28.9s54.7-25.1 73.1-96.4l23.1 9.8-10.4 125.2 19.4 58.2L272.6 484l12.2-141.8 16.1 14.3 41.9-47.3 1-39.4-63.8 19.8zm125.8 64.8L318.9 472l56.8-28 6.1 24 51.6-36zm-275.4 0 74.8 76.7-56.8-28-6.1 24-51.6-36zm266.5-117.7L486 219.3C506 31 432.4 18.7 360.5 58.7c0 0 114.1-27.7 66.1 109.4l-35.8 14.7zm-257.6 0L25.96 219.3C6 31 79.61 18.7 151.5 58.7c0 0-114.14-27.7-66.12 109.4l35.82 14.7zM256 125.9l67.5 41.8s-3.2 35-42.4 64.7L256 180.7l-25.1 51.7c-39.2-29.7-42.4-64.7-42.4-64.7z"
                  fill="url(#caro-asercion-warlord-helmet-gradient-1)"
                  transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256) skewX(0) skewY(0)"
                  stroke="#ffffff"
                  stroke-opacity="1"
                  stroke-width="8"
                  filter="url(#shadow-1)"
                ></path>
              </g>
            </svg>
            <span className="p-2 group-hover:text-slate-400 text-center">
              Next-Level <br />
              Games
            </span>
          </Link>

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
                    className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-800 group"
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
    </>
  );
};

export default Sidebar;
