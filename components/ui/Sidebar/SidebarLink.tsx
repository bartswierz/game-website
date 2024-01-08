"use client";

import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";

interface SidebarLinkProps {
  pathname: string; // ex. 'platforms'
  linkData: {
    linkTitle: string; // ex. 'PC'
    link: string; // ex. 'PC'
    linkID: number; // ex. 4
  };
  closeMenuCallback?: () => void;
}

const SidebarLink = ({ pathname, linkData, closeMenuCallback }: SidebarLinkProps) => {
  // const { link, platformID } = linkObj;
  const { linkTitle, link, linkID } = linkData;

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  const closeSidebarMenu = () => {
    if (closeMenuCallback) closeMenuCallback(); //Function Callback inside Navbar component to close menu
  };

  return (
    <li>
      <Link
        href={{ pathname: `/dashboard/${pathname}/${slugify(link)}`, query: { id: linkID } }}
        // onClick={() => handleLink(link)}
        className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-800  group"
        onClick={closeSidebarMenu}
      >
        <IoGameControllerOutline />
        <span className="ml-3">{linkTitle}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
