import Footer from "@/components/web/shared/Footer";
import Header from "@/components/web/shared/header/Header";
import React, { FC, PropsWithChildren } from "react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { WebsiteQueryProvider } from "@/providers/react-query-provider";
import AnimationHeaderScroll from "@/components/web/shared/header/AnimationHeaderScroll";
import { Toaster } from "sonner";
import Icon from "@/components/common/Icon";
import { getUIConfigsByKeyCached } from "@/services/configs";
import { getEnv } from "@/lib/env";

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
  console.log("env", getEnv());
  const configs = await getUIConfigsByKeyCached("layout");

  return (
    <div
      className={`website ${popinsSans.variable} ${allogist.variable} antialiased font-poppins-sans bg-web-background-1`}
    >
      <WebsiteQueryProvider>
        <AnimationHeaderScroll>
          <Header configs={configs?.value.header || {}} />
        </AnimationHeaderScroll>
        <main className="pt-[149px] lg:pt-[146px] min-h-[calc(100vh-149px)] lg:min-h-[calc(100vh-146px)]">
          {children}
        </main>
        <Footer configs={configs?.value.footer || {}} />
        <Toaster
          visibleToasts={3}
          position="top-right"
          icons={{
            success: (
              <Icon
                icon="ph:check-circle-fill"
                className="text-xl text-web-secondary-1"
              />
            ),
            error: (
              <Icon
                icon="ph:x-circle-fill"
                className="text-xl text-web-error"
              />
            ),
          }}
        />
      </WebsiteQueryProvider>
    </div>
  );
};

export default Layout;
