"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionTrigger } from "../Shadcn/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

// interface SidebarDropdownProps {
//   pathname: string;
//   linkTitle: string;
//   linkList: {
//     link: string;
//     platformID: number;
//   }[];
//   uid: number;
//   handleLinkCallBack: (link: string) => void;
// }

interface SidebarDropdownProps {
  pathname: string; // ex. 'platforms'
  linkData: {
    linkTitle: string; // ex. 'PC'
    linkList: {
      link: string;
      linkID: number;
    }[];
  };
  closeMenuCallback?: () => void;
  // linkData: {
  //   linkTitle: string; // ex. 'PC'
  //   link: string; // ex. 'PC'
  //   linkID: number; // ex. 4
  // };
}

// CONTAINS THE DROPDOWN MENU FOR SIDEBAR LINKS
// const SidebarDropdown = ({ pathname, linkTitle, linkList, uid, handleLinkCallBack }: SidebarDropdownProps) => {
const SidebarDropdown = ({ pathname, linkData, closeMenuCallback }: SidebarDropdownProps) => {
  const { linkTitle, linkList } = linkData;
  const [isActive, setIsActive] = useState<number | null>(null);

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };
  // If user opened sidebar menu on mobile via hamburger menu, this will close the menu via callback function back to navbar.
  const closeSidebarMenu = () => {
    if (closeMenuCallback) closeMenuCallback();
  };
  // if (!uid) return <div>Loading...</div>;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        {/* TEXT GOES HERE */}
        <AccordionTrigger className="flex items-center justify-between gap-x-3 w-full p-2 text-base text-white animate-in animate-out duration-75 rounded-lg group hover:bg-gray-800">
          <span className="rotate-0">
            <IoGameControllerOutline />
          </span>
          <span className="text-white w-full text-start">{linkTitle}</span>
        </AccordionTrigger>
        <AccordionContent>
          {/* {linkList.map(({ link, platformID }) => ( */}
          {linkList.map(({ link, linkID }) => (
            <li key={linkID}>
              <Link
                href={{ pathname: `/dashboard/${pathname}/${slugify(link)}`, query: { id: linkID } }}
                // onClick={() => handleLink(link)}
                className="flex items-center w-full p-2 text-white rounded-lg pl-11 hover:bg-gray-800"
                onClick={closeSidebarMenu}
              >
                {link}
              </Link>
            </li>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarDropdown;
