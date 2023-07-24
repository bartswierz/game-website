"use client";
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
// import { nanoid } from "nanoid";
// import { useEffect, useState } from "react";

interface SidebarLinkProps {
  pathname: string;
  linkTitle: string;
  linkObj: {
    link: string;
    platformID: number;
  };
}
// SINGLE SIDEBAR LINK
const SidebarLink = ({ pathname, linkTitle, linkObj }: SidebarLinkProps) => {
  const { link, platformID } = linkObj;

  const slugify = (link: string) => {
    return link.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <li>
      <Link
        href={{ pathname: `/${pathname}/${slugify(link)}`, query: { id: platformID } }}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
