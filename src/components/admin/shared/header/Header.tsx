import React, { ReactNode } from "react";

export default function Header({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) {
  return (
    <>
      <div className="fixed z-30 duration-200 start-0 lg:start-64 end-0 top-0 bg-white px-5">
        <div className="flex justify-between items-center h-12">
          <p className="text-gray-900 font-semibold">{title}</p>

          {actions}
        </div>
      </div>
      <div className="h-12"></div>
    </>
  );
}
