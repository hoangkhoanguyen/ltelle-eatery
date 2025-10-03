import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import SettingsTextareaInput from "../elements/SettingsTextareaInput";
import { CommonField, TextareaField } from "@/types/settings";

const SettingTextareaField: FC<
  Omit<TextareaField, "type"> & { control: Control; name: string }
> = ({ control, name, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SettingsTextareaInput
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default SettingTextareaField;
