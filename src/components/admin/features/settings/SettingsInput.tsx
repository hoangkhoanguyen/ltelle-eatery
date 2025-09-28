import React, { FC, PropsWithChildren } from "react";
import { InputWithLabel } from "../../ui/form";

const SettingsInput: FC<
  PropsWithChildren<{
    label: string;
    required?: boolean;
    description?: string;
  }>
> = ({ label, required, description, children }) => {
  return (
    <InputWithLabel label={label} required={required}>
      {description && (
        <p className="text-xs mb-1 text-gray-500 italic">{description}</p>
      )}
      {children}
    </InputWithLabel>
  );
};

export default SettingsInput;
