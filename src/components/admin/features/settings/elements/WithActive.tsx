import { Switch } from "@/components/admin/ui/form";
import React, { FC, PropsWithChildren } from "react";

const WithActive: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-3">
      <Switch /> <div className="flex-1">{children}</div>
    </div>
  );
};

export default WithActive;
