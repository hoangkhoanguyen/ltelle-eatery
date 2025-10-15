"use client";
import Image from "next/image";
import React from "react";
import { Menu } from "./Menu";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useLogout } from "@/hooks/admin/features/auth/useLogout";

const Sidebar = () => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={
        "fixed top-0 bottom-0 start-0 bg-slate-900 dark:bg-gray-900 duration-200 w-64 -translate-x-full rtl:translate-x-full lg:translate-x-0 flex flex-col"
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

      {/* Menu items - takes remaining space */}
      <div className="flex-1">
        <Menu />
      </div>

      {/* Logout button at bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
            "text-white hover:bg-slate-800 dark:hover:bg-gray-800",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <Icon
            icon={
              isPending
                ? "svg-spinners:8-dots-rotate"
                : "material-symbols:logout"
            }
            className="text-xl"
          />
          <span className="text-sm font-medium">
            {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
          </span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
