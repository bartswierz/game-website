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
  handleLinkCallBack: (link: string) => void;
}
// CONTAINS THE DROPDOWN MENU FOR SIDEBAR LINKS
const SidebarDropdown = ({ pathname, linkTitle, linkList, uid, handleLinkCallBack }: SidebarDropdownProps) => {
  const [isActive, setIsActive] = useState<number | null>(null);

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  // OPEN/CLOSES DROPDOWN
  const handleDropdown = (dropdownID: number) => {
    //isActive !== uid ? OPEN DROPDOWN : CLOSE DROPDOWN
    isActive !== uid ? setIsActive(dropdownID) : setIsActive(null);
  };

  //Callback function back to Sidebar component to update ACTIVE LINK & CLOSE SIDEBAR IF MOBILE SCREEN UPON CLICKING LINK
  const handleLink = (link: string) => {
    handleLinkCallBack(link);
  };

  if (!uid) return <div>Loading...</div>;

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-white animate-in animate-out duration-75- rounded-lg group hover:bg-gray-800 transition-[height] duration-500 border"
        aria-controls={`dropdown-example-${uid}`}
        data-collapse-toggle={`dropdown-example-${uid}`}
        onClick={() => handleDropdown(uid)}
      >
        <IoGameControllerOutline />
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{linkTitle}</span>
        {/* DROPDOWN ICON */}
        <div className={`transition-all duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </div>
      </button>

      {/* 2ND LEVEL DROPDOWN ITEM */}
      <ul
        id={`dropdown-example-${uid}`}
        // className={`${uid === isActive ? "visible" : "hidden"} py-2 space-y-2`}
        //IF uid === isActive then we want to do the dropdown transition, on the second click it should animate up
        //Version #1
        // className={`${
        //   uid === isActive
        //     ? "max-h-full transition-transform- transition-all transition-max-[height]- transition-[height]-  animate-accordion-down duration-1000- ease-in-out ease-out-"
        //     : "max-h-0 animate-accordion-up transition-height duration-300"
        // } overflow-hidden transition-all transition-transform- py-2 space-y-2`}
        //Version #2
        className={`transition-[height] overflow-hidden py-2 space-y-2 duration-500 ease-in-out border ${
          uid === isActive ? "max-h-full animate-accordion-down accordion-down animate-in" : "max-h-0 animate-accordion-up animate-out"
        } `}
        // className={`${
        //   uid === isActive ? "max-h-full transition-max-height" : "max-h-0"
        // } overflow-hidden transition-transform py-2 space-y-2`}
      >
        {linkList.map(({ link, platformID }) => (
          <li key={platformID}>
            <Link
              href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
              onClick={() => handleLink(link)}
              className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-800 "
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
