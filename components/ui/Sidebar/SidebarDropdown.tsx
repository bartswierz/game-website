"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { useState } from "react";

interface SidebarDropdownProps {
  pathname: string;
  linkTitle: string;
  linkList: {
    link: string;
    platformID: number;
  }[];
  uid: number;
}
// CONTAINS THE DROPDOWN MENU FOR SIDEBAR LINKS
const SidebarDropdown = ({ pathname, linkTitle, linkList, uid }: SidebarDropdownProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  // OPEN/CLOSES DROPDOWN
  const handleDropdown = (dropdownID: number) => {
    //isActive !== uid ? OPEN DROPDOWN : CLOSE DROPDOWN
    isActive !== uid ? setIsActive(dropdownID) : setIsActive(null);
  };

  if (!uid) return <div>Loading...</div>;

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 "
        aria-controls={`dropdown-example-${uid}`}
        data-collapse-toggle={`dropdown-example-${uid}`}
        onClick={() => handleDropdown(uid)}
      >
        <IoGameControllerOutline />
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{linkTitle}</span>
        {/* DROPDOWN ICON */}
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* 2ND LEVEL DROPDOWN ITEM */}
      <ul id={`dropdown-example-${uid}`} className={`${uid === isActive ? "visible" : "hidden"} py-2 space-y-2`}>
        {linkList.map(({ link, platformID }) => (
          <li key={platformID}>
            <Link
              href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
              className="flex items-center w-full p-2 text-white  transition duration-75 rounded-lg pl-11 group hover:bg-gray-800 "
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarDropdown;
