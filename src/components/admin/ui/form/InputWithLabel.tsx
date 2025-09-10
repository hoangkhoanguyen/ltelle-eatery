import React, { FC, PropsWithChildren } from "react";
import { Label } from "./Label";

export const InputWithLabel: FC<
  PropsWithChildren<{ label: string; required?: boolean }>
> = ({ children, label, required }) => {
  return (
    <div>
      <Label>
        {label} {required && <span className="text-error">*</span>}
      </Label>
      {children}
    </div>
  );
};
