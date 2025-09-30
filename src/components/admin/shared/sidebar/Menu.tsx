"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { IMenuItem, MenuItem } from "./MenuItem";
import { cn } from "@/lib/utils";
import { adminRoutes } from "@/constants/route";

const menuItems: IMenuItem[] = [
  // { label: "Dashboard", href: "/admin", icon: "dashboard" },
  {
    label: "Products",
    href: adminRoutes.products(),
    icon: "famicons:fast-food-outline",
    activeIcon: "famicons:fast-food",
    type: "link",
  },
  {
    label: "Orders",
    href: adminRoutes.orders(),
    icon: "bx:food-menu",
    activeIcon: "bxs:food-menu",
    type: "link",
  },
  {
    label: "Reservations",
    href: adminRoutes.reservations(),
    icon: "material-symbols:food-bank-outline-rounded",
    activeIcon: "material-symbols:food-bank-rounded",
    type: "link",
  },
  {
    label: "Cấu hình giao diện",
    href: adminRoutes.uiSettings(""),
    icon: "material-symbols:settings-outline-rounded",
    activeIcon: "material-symbols:settings-rounded",
    type: "collapse",
    children: [
      {
        label: "Tổng quan",
        href: adminRoutes.uiSettings("general"),
        type: "link",
      },
      {
        label: "Trang chủ",
        href: adminRoutes.uiSettings("home"),
        type: "link",
      },
      {
        label: "Menu",
        href: adminRoutes.uiSettings("menu"),
        type: "link",
      },
    ],
  },
];

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className={cn("pt-7 flex flex-col gap-2 px-4")}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} pathname={pathname} {...item} />
      ))}
    </div>
  );
};
