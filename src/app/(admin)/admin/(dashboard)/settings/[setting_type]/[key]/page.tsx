import { adminConfigs } from "@/constants/settings";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ key: string; setting_type: string }>;
}) => {
  const { key, setting_type } = await params;

  const settings = adminConfigs[setting_type as keyof typeof adminConfigs];
  if (!settings) {
    return <div>Invalid setting type {setting_type}</div>;
  }

  const { getConfigsByKey, InitSettingComponent, SettingComponent } = settings;

  if (!getConfigsByKey || !InitSettingComponent || !SettingComponent) {
    return <div>Settings not properly configured for {setting_type}</div>;
  }

  const config = await getConfigsByKey(key);

  const meta = settings.meta[key as keyof typeof settings.meta];

  const initConfigs =
    settings.initConfigs?.[key as keyof typeof settings.initConfigs];

  if (config) return <SettingComponent data={config} meta={meta} />;

  if (initConfigs) {
    return <InitSettingComponent initConfigs={initConfigs} />;
  }

  return <div>No configuration found for key: {key}</div>;
};

export default page;
