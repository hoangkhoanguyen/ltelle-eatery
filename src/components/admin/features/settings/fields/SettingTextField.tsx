import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import SettingsTextInput from "../elements/SettingsTextInput";
import { TextField } from "@/types/settings";

const SettingTextField: FC<
  Omit<TextField, "type" | "key"> & { control: Control; name: string }
> = ({ control, name, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SettingsTextInput
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default SettingTextField;
