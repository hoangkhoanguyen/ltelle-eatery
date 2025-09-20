import React from "react";
import { HeaderContacts } from "./HeaderContacts";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";

export default function Header() {
  return (
    <>
      <header>
        <div className="bg-web-background-1 border-b border-web-background-3">
          <div className="container mx-auto px-3 md:px-6">
            {/* upper header */}
            <div className="flex justify-between items-center py-1.5 md:py-4.5 border-b border-web-secondary-1">
              <div>
                <HeaderContacts />
              </div>
              <span className="text-web-body text-web-content-1 hidden md:block">
                Welcom to Ha Giang
              </span>
            </div>
            {/* below header */}
            <div className="pt-4 pb-5 flex justify-between items-center">
              <Logo />
              <DesktopMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
