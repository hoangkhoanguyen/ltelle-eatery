import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import SettingsBooleanInput from "../elements/SettingsBooleanInput";

const SettingBooleanField: FC<{ control: Control; name: string }> = ({
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <SettingsBooleanInput checked={value} onCheckedChange={onChange} />
      )}
    />
  );
};

export default SettingBooleanField;
