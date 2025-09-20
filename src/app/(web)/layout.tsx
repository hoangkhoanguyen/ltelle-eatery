import Header from "@/components/web/shared/header/Header";
import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="website">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
