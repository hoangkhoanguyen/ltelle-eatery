"use client";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import React, { FC } from "react";

export interface IMenuItem {
  label: string;
  icon?: string;
  activeIcon?: string;
  href?: string;
  type: "link" | "collapse";
  children?: IMenuItem[];
}

export const MenuItem: FC<IMenuItem & { pathname: string }> = ({
  type,
  ...rest
}) => {
  const { label, icon, activeIcon, href, pathname, children = [] } = rest;
  const isActive = pathname.startsWith(href || "");

  if (type === "link") {
    return (
      <Link
        href={href!}
        className={cn(
          "flex items-center rounded-xl duration-200 gap-3 py-2.5 px-4 hover:bg-slate-600",
          isActive ? "bg-slate-800" : "",
        )}
      >
        {icon && (
          <Icon
            className={cn("text-xl text-white")}
            icon={isActive ? activeIcon! : icon}
          />
        )}
        <span
          className={cn("text-sm font-medium duration-200 truncate text-white")}
        >
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Disclosure as="div" className="w-full max-w-md">
      <DisclosureButton className="flex justify-between items-center rounded-xl duration-200 gap-3 py-2.5 px-4 hover:bg-slate-600 w-full cursor-pointer">
        <div className="flex-1 flex items-center gap-3">
          {icon && (
            <Icon
              className={cn("text-xl text-white")}
              icon={isActive ? activeIcon! : icon}
            />
          )}
          <span
            className={cn(
              "text-sm font-medium duration-200 truncate text-white",
            )}
          >
            {label}
          </span>
        </div>
        <Icon icon="ph:caret-right" className="text-lg text-white" />
      </DisclosureButton>
      <div className="overflow-hidden py-2">
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:h-0 data-open:h-auto data-closed:opacity-0"
        >
          <div className="ps-8">
            {children.map((child, index) => (
              <MenuItem key={index} {...child} pathname={pathname} />
            ))}
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};
