"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionTrigger } from "../Shadcn/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

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
          {linkList.map(({ link, platformID }) => (
            <li key={platformID}>
              <Link
                href={{ pathname: `/dashboard/${pathname}/${slugify(link)}`, query: { id: platformID } }}
                onClick={() => handleLink(link)}
                className="flex items-center w-full p-2 text-white rounded-lg pl-11 hover:bg-gray-800"
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
