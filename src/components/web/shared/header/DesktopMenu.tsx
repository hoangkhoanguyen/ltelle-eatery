import { webRoutes } from "@/constants/route";
import Link from "next/link";
import React from "react";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";

interface IMenuItem {
  href: string;
  label: string;
  title: string;
}

export const MENU: IMenuItem[] = [
  {
    href: webRoutes.home(),
    label: "Home",
    title: "Welcome to Our Table",
  },
  {
    href: webRoutes.menu(),
    label: "Menu",
    title: "Our Dishes & Drinks",
  },
  {
    href: webRoutes.reservation(),
    label: "Reservations",
    title: "Book Your Table",
  },
  {
    href: webRoutes.contact(),
    label: "Contact",
    title: "Get in Touch",
  },
];

const DesktopMenu = () => {
  return (
    <div className="flex items-center gap-2 lg:gap-10">
      <nav aria-label="Site navigation" className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {MENU.map((menu) => (
            <li key={menu.label}>
              <MenuItem {...menu} />
            </li>
          ))}
        </ul>
      </nav>
      <MobileMenu />
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
