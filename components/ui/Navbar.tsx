import Link from "next/link";
import { Searchbar, Sidebar } from "@/components/ui";
import { IoGameControllerOutline } from "react-icons/io5";
import { sidebarData } from "@/constants";
import SiteLogo from "@/public/SiteLogo.svg";
//BUILT CUSTOM GAME ICON - https://game-icons.net/1x1/caro-asercion/warlord-helmet.html
const Navbar = () => {
  return (
    <header>
      {/* GAME ICON */}
      <nav className="flex flex-row justify-between items-center bg-gray-900 p-4 shadow text-white font-bold">
        <Link href="/" className="cursor-pointer hover:text-gray-300 text-xl group">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: "60px", width: "60px" }}>
            <defs>
              <filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%">
                <feFlood floodColor="rgba(255, 255, 255, 1)" result="flood"></feFlood>
                <feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite>
                <feGaussianBlur in="composite" stdDeviation="15" result="blur"></feGaussianBlur>
                <feOffset dx="0" dy="0" result="offset"></feOffset>
                <feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite>
              </filter>
              <linearGradient id="caro-asercion-warlord-helmet-gradient-0" x1="0" x2="1" y1="1" y2="0">
                <stop offset="0%" stopColor="#02a5f6" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="#0101d3" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient x1="0" x2="1" y1="0" y2="1" id="caro-asercion-warlord-helmet-gradient-1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <polygon
              points="256,494,18,256,256,18,494,256"
              fill="url(#caro-asercion-warlord-helmet-gradient-0)"
              stroke="#464646"
              strokeOpacity="1"
              strokeWidth="18"
            ></polygon>
            <g transform="translate(0,-22)">
              <path
                d="M267.9 330.5h-23.8L232 289.6l-63.8-19.8 1 39.4 41.9 47.3 16.1-14.3L239.4 484 130.2 361.8l19.4-58.2-10.4-125.2 23.1-9.8c18.4 71.3 73.1 96.4 73.1 96.4l20.6-28.9 20.6 28.9s54.7-25.1 73.1-96.4l23.1 9.8-10.4 125.2 19.4 58.2L272.6 484l12.2-141.8 16.1 14.3 41.9-47.3 1-39.4-63.8 19.8zm125.8 64.8L318.9 472l56.8-28 6.1 24 51.6-36zm-275.4 0 74.8 76.7-56.8-28-6.1 24-51.6-36zm266.5-117.7L486 219.3C506 31 432.4 18.7 360.5 58.7c0 0 114.1-27.7 66.1 109.4l-35.8 14.7zm-257.6 0L25.96 219.3C6 31 79.61 18.7 151.5 58.7c0 0-114.14-27.7-66.12 109.4l35.82 14.7zM256 125.9l67.5 41.8s-3.2 35-42.4 64.7L256 180.7l-25.1 51.7c-39.2-29.7-42.4-64.7-42.4-64.7z"
                fill="url(#caro-asercion-warlord-helmet-gradient-1)"
                transform="translate(0, 0) scale(1, 1) rotate(-360, 256, 256) skewX(0) skewY(0)"
                stroke="#ffffff"
                strokeOpacity="1"
                strokeWidth="8"
                filter="url(#shadow-1)"
              ></path>
            </g>
          </svg>
        </Link>

        {/* SEARCH BAR - SEARCHES FOR GAMES WITH THOSE INCLUDED LETTERS - NOT EXACT GAME */}
        <Searchbar />

        {/* HAMBURGER ICON & LEFT-ALIGNED SIDEBAR */}
        <Sidebar />
      </nav>
    </header>
  );
};

export default Navbar;
