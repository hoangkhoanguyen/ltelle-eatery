"use client";
import React, { FC, useMemo } from "react";
import Setting from "../settings/Setting";
import { UIConfigDB } from "@/db/schemas";
import { uiMeta } from "@/constants/settings/ui";
import useUpdateUIConfigs from "@/hooks/admin/ui-settings/useUpdateUIConfigs";
import { toast } from "sonner";

const UISetting: FC<{ data: UIConfigDB }> = ({ data }) => {
  const meta = useMemo(
    () => uiMeta[data.key as keyof typeof uiMeta],
    [data.key],
  );

  const { mutate } = useUpdateUIConfigs();

  const onSubmit = (newConfig: any) => {
    mutate(
      { key: data.key, value: newConfig },
      {
        onSuccess() {
          toast.success("Cập nhật cấu hình thành công");
        },
        onError() {
          toast.error("Cập nhật cấu hình thất bại");
        },
      },
    );
  };

  return (
    <Setting
      onSubmit={onSubmit}
      configs={data.value}
      title={data.title}
      metaFields={meta}
    />
  );
};

export default UISetting;
