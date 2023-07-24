"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface SidebarDropdownProps {
  pathname: string;
  linkTitle: string;
  linkList: {
    link: string;
    platformID: number;
  }[];
}
// CONTAINS THE DROPDOWN MENU FOR SIDEBAR LINKS
const SidebarDropdown = ({ pathname, linkTitle, linkList }: SidebarDropdownProps) => {
  // const dropdownUID = nanoid(10);
  // console.log("dropdownUID", dropdownUID);
  // const dropdownUID = "";
  const [dropdownUID, setDropdownUID] = useState("");

  useEffect(() => {
    const dropdownUID = nanoid(10);
    setDropdownUID(dropdownUID);
    console.log("dropdownUID", dropdownUID);
  }, []);

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  const generateUID = () => {
    return nanoid(10);
  };

  return (
    <li>
      {/* {`dropdown-example-${idx}`} - We update the dropdown-exampleby attaching an id to hallow unique IDs for each item otherwise only the first tab item would open for all */}
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 "
        aria-controls={`dropdown-example-${dropdownUID}`}
        data-collapse-toggle={`dropdown-example-${dropdownUID}`}
        // aria-controls="dropdown-example"
        // data-collapse-toggle="dropdown-example"
      >
        <IoGameControllerOutline />
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{linkTitle}</span>
        {/* DROPDOWN ICON */}
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* 2ND LEVEL DROPDOWN ITEM */}
      <ul id={`dropdown-example-${dropdownUID}`} className="hidden py-2 space-y-2">
        {/* PUT THE MAP HERE */}

        {linkList.map(({ link, platformID }) => (
          <li key={generateUID()}>
            <Link
              href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
              // href="#"
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
