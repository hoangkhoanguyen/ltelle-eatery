import UISetting from "@/components/admin/features/ui-settings/UISetting";
import { APPItems, appMeta, initAppConfigs } from "./app";
import { initUIConfigs, UIItems, uiMeta } from "./ui";
import InitUISetting from "@/components/admin/features/ui-settings/InitUISetting";
import AppSetting from "@/components/admin/features/app-settings/AppSetting";
import InitAppSetting from "@/components/admin/features/app-settings/InitAppSetting";
import { getUIConfigsByKey } from "@/services/ui-configs";

export const adminConfigs = {
  ui: {
    items: UIItems,
    meta: uiMeta,
    initConfigs: initUIConfigs,
    SettingComponent: UISetting,
    InitSettingComponent: InitUISetting,
    getConfigsByKey: getUIConfigsByKey,
  },
  app: {
    items: APPItems,
    meta: appMeta,
    initConfigs: initAppConfigs,
    SettingComponent: AppSetting,
    InitSettingComponent: InitAppSetting,
    getConfigsByKey: getUIConfigsByKey,
  },
};
