import { FieldType } from "@/types/settings";
import React, { FC } from "react";
import { Control, FieldError } from "react-hook-form";

const SettingField: FC<{
  item: FieldType;
  control: Control<any>;
}> = ({ item, control }) => {
  return <div>SettingField</div>;
};

export default SettingField;
