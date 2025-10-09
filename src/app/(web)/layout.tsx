import Footer from "@/components/web/shared/Footer";
import Header from "@/components/web/shared/header/Header";
import React, { FC, PropsWithChildren } from "react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { getUIConfigsByKey } from "@/services/ui-configs";
import { WebsiteQueryProvider } from "@/providers/react-query-provider";
import AnimationHeaderScroll from "@/components/web/shared/header/AnimationHeaderScroll";

const popinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const allogist = localFont({
  src: "./SVN-Allogist.otf",
  variable: "--font-allogist",
});

export const dynamic = "force-dynamic";

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const configs = await getUIConfigsByKey("layout");

  return (
    <div
      className={`website ${popinsSans.variable} ${allogist.variable} antialiased font-poppins-sans bg-web-background-1`}
    >
      <WebsiteQueryProvider>
        <AnimationHeaderScroll>
          <Header configs={configs?.value.header || {}} />
        </AnimationHeaderScroll>
        {/* <main className=" min-h-[calc(100vh-149px)] lg:min-h-[calc(100vh-146px)]"> */}
        <main className="pt-[149px] lg:pt-[146px] min-h-[calc(100vh-149px)] lg:min-h-[calc(100vh-146px)]">
          {children}
        </main>
        <Footer configs={configs?.value.footer || {}} />
      </WebsiteQueryProvider>
    </div>
  );
};

export default Layout;
