"use client";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { formatLink } from "@/utils";

const Sidebar = () => {
  return (
    <div className="border w-72 h-max p-4 m-4 rounded-lg">
      <div className=""></div>
      {sidebarData.map(({ title, links }) => {
        return (
          <div className="text-white">
            <div className="text-lg font-bold py-3">{title}</div>

            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <Link href={formatLink(title, link)} className="flex gap-2">
                  <span className="w-6 h-6 bg-slate-500  rounded-md"></span>
                  <li className="cursor-pointer hover:text-gray-500 ">{link}</li>
                </Link>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
