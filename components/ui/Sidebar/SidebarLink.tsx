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
}
// SINGLE SIDEBAR LINK
const SidebarLink = ({ pathname, linkTitle, linkObj }: SidebarLinkProps) => {
  const { link, platformID } = linkObj;
  // console.log("sidebarLink - pathname: ", pathname);
  // console.log("sidebarLink - linkTitle: ", linkTitle);
  // console.log("sidebarLink - linkObj: ", linkObj);
  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <li>
      <Link
        href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
        // href={{ pathname: `/${pathname}/`, query: { id: platformID } }}
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
