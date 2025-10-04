"use client";
import React, { FC } from "react";
import Setting from "../settings/Setting";
import useUpdateAppConfigs from "@/hooks/admin/app-settings/useUpdateAppConfigs";
import { toast } from "sonner";
import { useSetLoading } from "@/hooks/admin/loading";
import { ISetting, MetaValue } from "@/types/settings";

const AppConfig: FC<{ data: ISetting; meta: MetaValue[] }> = ({
  data,
  meta,
}) => {
  const { mutate, isPending } = useUpdateAppConfigs();

  useSetLoading(isPending);

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

export default AppConfig;
