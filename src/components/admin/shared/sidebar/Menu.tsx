"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { MenuItem } from "./MenuItem";
import { cn } from "@/lib/utils";
import { adminRoutes } from "@/constants/route";

const menuItems = [
  // { label: "Dashboard", href: "/admin", icon: "dashboard" },
  {
    label: "Products",
    href: adminRoutes.products(),
    icon: "famicons:fast-food-outline",
    activeIcon: "famicons:fast-food",
  },
  {
    label: "Orders",
    href: adminRoutes.orders(),
    icon: "bx:food-menu",
    activeIcon: "bxs:food-menu",
  },
  {
    label: "Reservations",
    href: adminRoutes.reservations(),
    icon: "material-symbols:food-bank-outline-rounded",
    activeIcon: "material-symbols:food-bank-rounded",
  },
  // {
  //   label: "Profile",
  //   href: adminRoutes.me,
  //   icon: "iconamoon:profile-circle",
  //   activeIcon: "iconamoon:profile-circle-fill",
  // },
];

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className={cn("pt-7 flex flex-col gap-2 px-4")}>
      {menuItems.map((item) => (
        <MenuItem key={item.href} pathname={pathname} {...item} />
      ))}
    </div>
  );
};
