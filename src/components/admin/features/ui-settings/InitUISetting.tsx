"use client";
import React, { FC } from "react";
import Header from "../../shared/header/Header";
import { initUIConfigs } from "@/constants/settings/ui";
import { Button } from "../../ui/button";
import useInitUIConfigs from "@/hooks/admin/ui-settings/useInitUIConfigs";
import { toast } from "sonner";

const InitUISetting: FC<{
  configKey: string;
}> = ({ configKey }) => {
  const initConfigs = initUIConfigs[configKey as keyof typeof initUIConfigs];

  const { mutate } = useInitUIConfigs();

  if (!initConfigs) {
    return <div>Invalid UI Config Key {configKey}</div>;
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
                  // Handle success
                  toast.success("UI Config initialized successfully");
                },
                onError: () => {
                  // Handle error
                  toast.error("Failed to initialize UI Config");
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

export default InitUISetting;
