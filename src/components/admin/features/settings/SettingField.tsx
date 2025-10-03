import { FieldType } from "@/types/settings";
import React, { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import SettingTextField from "./fields/SettingTextField";
import SettingObjectField from "./fields/SettingObjectField";
import SettingImageField from "./fields/SettingImageField";
import SettingBooleanField from "./fields/SettingBooleanField";
import SettingTextareaField from "./fields/SettingTextareaField";
import SettingArrayField from "./fields/SettingArrayField";

const SettingField: FC<{
  item: FieldType;
  control: Control<any>;
  name: string;
}> = ({ item, control, name }) => {
  switch (item.type) {
    case "text":
      return <SettingTextField control={control} name={name} />;
    case "textarea":
      return <SettingTextareaField control={control} name={name} />;
    case "boolean":
      return <SettingBooleanField control={control} name={name} />;
    case "image":
      return <SettingImageField control={control} name={name} />;
    case "object":
      return <SettingObjectField control={control} name={name} {...item} />;
    case "array":
      return <SettingArrayField control={control} name={name} {...item} />;
  }
  return null;
};

export default SettingField;
