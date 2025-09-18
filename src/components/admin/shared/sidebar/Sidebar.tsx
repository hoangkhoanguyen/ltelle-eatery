import Image from "next/image";
import React from "react";
import { Menu } from "./Menu";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <div
      className={
        "fixed top-0 bottom-0 start-0 bg-slate-900 dark:bg-gray-900 duration-200 w-64 -translate-x-full rtl:translate-x-full lg:translate-x-0"
      }
    >
      <div className={cn("flex items-center gap-4 pt-4 duration-200 px-5")}>
        <Image
          src={"/assets/static/logo.svg"}
          width={32}
          height={32}
          alt="L'telle Eatery"
        />
        <p
          className={cn(
            "text-xl font-semibold text-white duration-200 flex-1 truncate",
          )}
        >
          L&#39;Telle Admin
        </p>
      </div>
      <Menu />
    </div>
  );
};
export default Sidebar;
