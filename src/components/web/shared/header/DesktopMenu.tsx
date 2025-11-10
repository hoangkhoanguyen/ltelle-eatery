import Link from "next/link";
import React, { FC } from "react";
import CartButton from "./CartButton";
import MobileMenuButton from "./MobileMenuButton";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";

interface IMenuItem {
  href: string;
  label: string;
  title: string;
}

const DesktopMenu: FC<{ menus: IMenuItem[] }> = async ({ menus }) => {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";
  console.log("pathname", pathname);
  return (
    <div className="flex items-center gap-2 lg:gap-10">
      <nav aria-label="Site navigation" className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {menus.map((menu) => {
            // Check if current path matches or starts with the menu href
            const isActive =
              pathname === menu.href ||
              (menu.href !== "/" && pathname.startsWith(menu.href));
            return (
              <li key={menu.label}>
                <MenuItem {...menu} isActive={isActive} />
              </li>
            );
          })}
        </ul>
      </nav>
      <MobileMenuButton />
      <CartButton />
    </div>
  );
};

export default DesktopMenu;

function MenuItem({
  href,
  label,
  title,
  isActive,
}: IMenuItem & {
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      title={title}
      className={cn(
        "text-web-subtitle text-web-content-1 hover:text-web-secondary-1 duration-200",
        {
          "text-web-secondary-1": isActive,
        },
      )}
    >
      {label}
    </Link>
  );
}
