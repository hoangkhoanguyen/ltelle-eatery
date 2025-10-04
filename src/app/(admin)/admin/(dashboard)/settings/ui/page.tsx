import Header from "@/components/admin/shared/header/Header";
import { adminRoutes } from "@/constants/route";
import { UIKEYS } from "@/constants/settings/ui";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Header title="Cấu hình giao diện website" />
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {UIKEYS.map((item) => (
            <Link
              href={adminRoutes.uiSettings(item.key)}
              key={item.key}
              className="card bg-white p-5 hover:text-primary hover:shadow duration-500"
            >
              <div className="card-header">
                <h3 className="text-sm text-center font-semibold">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
