import { AdminQueryProvider } from "@/providers/react-query-provider";
import React, { FC, PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="admin" data-theme="light">
      <AdminQueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
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
