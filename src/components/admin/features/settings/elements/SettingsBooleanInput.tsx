import { Switch } from "@/components/admin/ui/form";
import React, { FC } from "react";

const SettingsBooleanInput: FC<{
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}> = ({ checked, onCheckedChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
    />
  );
};

export default SettingsBooleanInput;
