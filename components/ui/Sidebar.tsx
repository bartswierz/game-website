"use client";
import { sidebarData } from "@/constants";

const Sidebar = () => {
  return (
    <div className="border w-72 h-vh p-4">
      <div className=""></div>
      {sidebarData.map(({ title, links }) => {
        return (
          <div className="text-white ">
            <div className="text-lg font-bold py-3">{title}</div>

            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <div className="flex gap-2">
                  <span className="w-6 h-6 bg-slate-500  rounded-md"></span>
                  <li className="cursor-pointer hover:text-gray-500 ">{link}</li>
                </div>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
