"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { formatLink } from "@/utils";
import { useState } from "react";

const Sidebar = () => {
  const [isActive, setIsActive] = useState<string | null>(null);

  // CAPITALIZES FIRST LETTER
  const capitalizeWord = (link: string) => {
    if (link === "rpg") return link.toUpperCase();
    else return link.charAt(0).toUpperCase() + link.slice(1);
  };

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  console.log("sidebarData", sidebarData);
  // Destructuring our three arrays from sidebarData for readability
  const { browse, platforms, genres } = sidebarData;

  return (
    <div className="border min-w-[260px] h-max p-4 m-4 rounded-lg">
      <div className="text-white">
        <div className="text-lg font-bold py-3">{capitalizeWord(browse.title)}</div>

        <ul className="flex flex-col gap-4">
          {/* BROWSE SECTION */}
          {/* TODO - FIND A WAY TO NOT PASS query to the BROWSE SECTION */}
          {browse.linkList.map((link) => (
            <li key={link}>
              <Link
                href={{ pathname: `/${browse.title}/${link}` }}
                className="flex gap-2"
                onClick={() => setIsActive(link)}
                key={link}
              >
                <span className="w-6 h-6 bg-slate-500  rounded-md"></span>
                <span className={`cursor-pointer hover:text-gray-500 ${link === isActive ? "text-blue-700 font-bold" : ""}`}>
                  {capitalizeWord(link)}
                </span>
              </Link>
            </li>
          ))}

          <div className="text-lg font-bold py-3">{capitalizeWord(platforms.title)}</div>

          {/* PLATFORMS SECTION */}
          {/* http://localhost:3000/genres/sports?genres=sports&page_size=6 */}
          {platforms.linkList.map(({ link, platformID }) => (
            <li key={platformID}>
              <Link
                href={{ pathname: `/${platforms.title}/${slugify(link)}`, query: { id: platformID } }}
                className="flex gap-2"
                onClick={() => setIsActive(link)}
                key={link}
              >
                <span className="w-6 h-6 bg-slate-500 rounded-md"></span>
                <span className={`cursor-pointer hover:text-gray-500 ${link === isActive ? "text-blue-700 font-bold" : ""}`}>
                  {capitalizeWord(link)}
                </span>
              </Link>
            </li>
          ))}

          <div className="text-lg font-bold py-3">{capitalizeWord(genres.title)}</div>

          {/* GENRES SECTION */}
          {/* http://localhost:3000/genres/sports?genres=sports&page_size=6 */}
          {/* TODO - FIND A WAY TO NOT PASS query to the BROWSE SECTION */}
          {genres.linkList.map((link) => (
            <li key={link}>
              <Link
                href={{ pathname: `/${genres.title}/${link}`, query: { genres: link, page_size: "12" } }}
                className="flex gap-2"
                onClick={() => setIsActive(link)}
                key={link}
              >
                <span className="w-6 h-6 bg-slate-500 rounded-md"></span>
                <span className={`cursor-pointer hover:text-gray-500 ${link === isActive ? "text-blue-700 font-bold" : ""}`}>
                  {capitalizeWord(link)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
