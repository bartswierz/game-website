"use client";
import Link from "next/link";

interface SidebarLinkProps {
  title: string;
  links: string[];
  pathname?: string;
  query?: string;
}

//TODO - give the pathname, optional query, pass in the object containing list
const SidebarLink = ({ title, links, pathname, query }: SidebarLinkProps) => {
  return <div></div>;
};

export default SidebarLink;
