import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

export const MenuItem: FC<{
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
  pathname: string;
}> = ({ href, activeIcon, icon, label, pathname }) => {
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-xl duration-200 gap-3 py-2.5 px-4 hover:bg-slate-600",
        isActive ? "bg-slate-800" : "",
      )}
    >
      <Icon
        className={cn("text-xl text-white")}
        icon={isActive ? activeIcon : icon}
      />
      <span
        className={cn("text-sm font-medium duration-200 truncate text-white")}
      >
        {label}
      </span>
    </Link>
  );
};
