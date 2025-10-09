import Link from "next/link";
import React, { FC } from "react";
import CartButton from "./CartButton";
import MobileMenuButton from "./MobileMenuButton";

interface IMenuItem {
  href: string;
  label: string;
  title: string;
}

const DesktopMenu: FC<{ menus: IMenuItem[] }> = ({ menus }) => {
  return (
    <div className="flex items-center gap-2 lg:gap-10">
      <nav aria-label="Site navigation" className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {menus.map((menu) => (
            <li key={menu.label}>
              <MenuItem {...menu} />
            </li>
          ))}
        </ul>
      </nav>
      <MobileMenuButton />
      <CartButton />
    </div>
  );
};

export default DesktopMenu;

function MenuItem({ href, label, title }: IMenuItem) {
  return (
    <Link
      href={href}
      title={title}
      className="text-web-subtitle text-web-content-1 hover:text-web-secondary-1 duration-200"
    >
      {label}
    </Link>
  );
}
