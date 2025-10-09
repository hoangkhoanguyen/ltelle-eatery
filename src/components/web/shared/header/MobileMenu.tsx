"use client";
import { useMobileMenu } from "@/hooks/web/ui/mobile-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

const MobileMenu: FC<{ menu: any[] }> = ({ menu }) => {
  const isOpen = useMobileMenu((state) => state.isOpen);
  const onClose = useMobileMenu((state) => state.onClose);

  return (
    <div
      className={cn(
        "bg-white lg:hidden rounded-es-lg rounded-ee-lg overflow-hidden transition-all duration-300",
        isOpen ? "h-auto" : "h-0",
      )}
    >
      <div className="py-10 px-3 ">
        <nav>
          <ul className="flex flex-col gap-10 items-stretch">
            {menu.map((m) => (
              <li key={m.label} className="">
                <Link
                  href={m.href}
                  title={m.title}
                  onClick={onClose}
                  className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-1 block w-full active:scale-95 duration-200"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
