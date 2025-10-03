import { ArrayField } from "@/types/settings";
import React, { FC } from "react";
import { Control, useFieldArray } from "react-hook-form";
import SettingsListInput from "../elements/SettingsListInput";
import SettingObjectField from "./SettingObjectField";

const SettingArrayField: FC<
  Omit<ArrayField, "type"> & { control: Control; name: string }
> = ({ control, name, isEditableList, itemType, newItem, needBox }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: "uid",
  });

  return (
    <SettingsListInput
      onAdd={() => {
        append(newItem);
      }}
      onRemove={remove}
      isEditableList={isEditableList}
    >
      {fields.map((field, index) =>
        needBox ? (
          <div
            key={field.uid}
            className="p-4 border rounded-lg border-gray-200 bg-gray-100"
          >
            <SettingObjectField
              control={control}
              name={`${name}.${index}`}
              fields={itemType.fields}
              needBox={itemType.needBox}
            />
          </div>
        ) : (
          <SettingObjectField
            key={field.uid}
            control={control}
            name={`${name}.${index}`}
            fields={itemType.fields}
            needBox={itemType.needBox}
          />
        ),
      )}
    </SettingsListInput>
  );
};

export default SettingArrayField;
