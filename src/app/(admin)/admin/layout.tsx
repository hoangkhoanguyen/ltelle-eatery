import { AdminQueryProvider } from "@/providers/react-query-provider";
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";
import { FullscreenLoading } from "@/components/admin/ui/loading";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body
      className={`admin antialiased ${interSans.variable} font-inter-sans`}
      data-theme="light"
    >
      <AdminQueryProvider>
        <NuqsAdapter>
          <Suspense>{children}</Suspense>
        </NuqsAdapter>
      </AdminQueryProvider>
      <Toaster
        visibleToasts={3}
        position="bottom-center"
        toastOptions={{
          classNames: {
            success: "!bg-green-600 !text-white",
            error: "!bg-red-600 !text-white",
            info: "!bg-blue-600 !text-white",
          },
          descriptionClassName: "!text-white",
        }}
      />
      <FullscreenLoading />
    </body>
  );
};

export default Layout;
