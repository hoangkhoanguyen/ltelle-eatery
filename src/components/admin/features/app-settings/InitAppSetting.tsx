"use client";
import React, { FC } from "react";
import Header from "../../shared/header/Header";
// import { initAppConfigs } from "@/constants/settings/app";
import { Button } from "../../ui/button";
import useInitAppConfigs from "@/hooks/admin/app-settings/useInitAppConfigs";
import { toast } from "sonner";
import { useSetLoading } from "@/hooks/admin/loading";
import { NewUIConfigDB } from "@/db/schemas";

const InitAppSetting: FC<{
  initConfigs: NewUIConfigDB;
}> = ({ initConfigs }) => {
  // const initConfigs = initAppConfigs[configKey as keyof typeof initAppConfigs];

  const { mutate, isPending } = useInitAppConfigs();

  useSetLoading(isPending);

  if (!initConfigs) {
    return <div>Invalid App Config Key {initConfigs}</div>;
  }

  return (
    <div>
      <Header
        title={initConfigs.title}
        actions={
          <Button
            color="primary"
            onClick={() =>
              mutate(initConfigs, {
                onSuccess: () => {
                  toast.success("App Config initialized successfully");
                },
                onError: () => {
                  toast.error("Failed to initialize App Config");
                },
              })
            }
          >
            Khởi tạo
          </Button>
        }
      />
    </div>
  );
};

export default InitAppSetting;
