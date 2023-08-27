"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
// import { nanoid } from "nanoid";
// import { useEffect, useState } from "react";

interface SidebarLinkProps {
  pathname: string; // ex. 'platforms'
  linkTitle: string; // ex. 'PC'
  linkObj: {
    link: string; // ex. 'PC'
    platformID: number; // ex. 4
  };
  handleLinkCallBack: (link: string) => void;
}
// SINGLE SIDEBAR LINK
const SidebarLink = ({ pathname, linkTitle, linkObj, handleLinkCallBack }: SidebarLinkProps) => {
  const { link, platformID } = linkObj;

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  //Callback function back to Sidebar component to update ACTIVE LINK & CLOSE SIDEBAR IF MOBILE SCREEN UPON CLICKING LINK
  const handleLink = (link: string) => {
    handleLinkCallBack(link);
  };

  return (
    <li>
      <Link
        href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
        onClick={() => handleLink(link)}
        className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-800  group"
      >
        <IoGameControllerOutline />
        <span className="ml-3">{linkTitle}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;

// "use client";
// import Link from "next/link";
// import { IoGameController, IoGameControllerOutline } from "react-icons/io5";

// interface SidebarLinkProps {
//   title: string;
//   links: string[];
//   pathname?: string;
//   query?: string;
// }

// //TODO - give the pathname, optional query, pass in the object containing list
// const SidebarLink = ({ title, links, pathname, query }: SidebarLinkProps) => {
//   return <div></div>;
// };

// export default SidebarLink;
