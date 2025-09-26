import { AdminQueryProvider } from "@/providers/react-query-provider";
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={`admin ${interSans.variable} font-inter-sans`}
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
            success: "!text-green-600",
            error: "!text-red-600",
            info: "!text-blue-600",
          },
        }}
      />
    </div>
  );
};

export default Layout;
