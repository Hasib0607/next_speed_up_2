"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import SideCategory from "../components/side-category";

const SideMenu = ({ setOpen,menu, design }: any) => {
  const [heading, setHeading] = useState("");

  const styleCss = `
    .text-hover:hover {
      color: ${design?.header_color}; 
    }
  `;

  return (
    <div>
      <style>{styleCss}</style>
      <div>
        <ul className="flex flex-col ">
          {menu?.slice(0, 6)?.map((item: any) => (
            <div
              onClick={() => item.url !== "category" && setOpen(false)}
              key={item.id}
              className="py-3 relative"
            >
              {item?.status == 1 && (
                <>
                  <li
                    className="border-b-[1px]"
                    onClick={() => {
                      heading !== item.name
                        ? setHeading(item.name)
                        : setHeading("");
                    }}
                  >
                    <Link
                      href={
                        item?.custom_link || (item?.url ? `/${item?.url}` : "/")
                      }
                    >
                      <h1 className="w-max uppercase font-semibold text-lg text-hover">
                        {item.name}
                      </h1>
                    </Link>
                  </li>
                </>
              )}
              {item.url === "category" && (
                <ChevronDownIcon
                  onClick={() => {
                    heading !== item.name
                      ? setHeading(item.name)
                      : setHeading("");
                  }}
                  className={`${
                    heading === item.name ? "rotate-180" : "rotate-0"
                  } h-5 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-4 top-4 `}
                />
              )}
              <div className={`${heading === item.name ? "block" : "hidden"}`}>
                {item.url === "category" ? <SideCategory design={design} /> : ""}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

SideMenu.displayName = 'SideMenucheck';

export default SideMenu;
