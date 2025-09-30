"use client";
import React, { FC, useMemo } from "react";
import SettingsCard from "./SettingsCard";
import { Config } from "@/types/configs";
import { FieldType, MetaValue } from "@/types/settings";
import SettingsInput from "./SettingsInput";
import SettingsListInput from "./elements/SettingsListInput";
import SettingsTextInput from "./elements/SettingsTextInput";
import SettingsNumberInput from "./elements/SettingsNumberInput";
import SettingsBooleanInput from "./elements/SettingsBooleanInput";
import SettingsImageInput from "./elements/SettingsImageInput";
import SettingsTextareaInput from "./elements/SettingsTextareaInput";
import { generateSettingSchema } from "@/lib/zod";
import { Controller, FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import WithError from "../../ui/form/WithError";

const Setting: FC<{
  meta: MetaValue;
  settingData: Config;
}> = ({ meta }) => {
  const schema = useMemo(
    () => generateSettingSchema(meta.fields),
    [meta.fields],
  );

  const { control } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(z.object(schema)),
  });

  const renderFieldInput = (
    item: FieldType,
    form: {
      value: any;
      onChange: (value: any) => void;
      error?: FieldError;
    },
  ) => {
    switch (item.type) {
      case "array":
        return (
          <SettingsListInput onAdd={() => {}} canAdd={item.canAdd}>
            {form.value || []}
          </SettingsListInput>
        );
      case "object":
        return <div>Object</div>;
      case "text":
        return (
          <WithError error={form.error}>
            <SettingsTextInput value={form.value} onChange={form.onChange} />
          </WithError>
        );
      case "textarea":
        return (
          <WithError error={form.error}>
            <SettingsTextareaInput
              value={form.value}
              onChange={form.onChange}
            />
          </WithError>
        );
      case "number":
        return (
          <WithError error={form.error}>
            <SettingsNumberInput value={form.value} onChange={form.onChange} />
          </WithError>
        );
      case "boolean":
        return <SettingsBooleanInput />;
      case "image":
        return <SettingsImageInput />;
      default:
        return <></>;
    }
  };

  return (
    <SettingsCard title={meta.title} description={meta.description}>
      <div className="flex flex-col gap-5">
        {meta.fields.map((field) => (
          <SettingsInput
            key={field.key}
            label={field.label}
            required={field.isRequired}
            description={field.description}
            isAlwaysShow={field.isAlwaysShow}
          >
            <Controller
              control={control}
              name={field.key}
              render={({ field: { value, onChange }, fieldState: { error } }) =>
                renderFieldInput(field, {
                  value,
                  onChange,
                  error,
                })
              }
            />
          </SettingsInput>
        ))}
      </div>
    </SettingsCard>
  );
};

export default Setting;
