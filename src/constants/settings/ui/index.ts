import { homepageMeta, initialHomepageConfig } from "./homepage";
import { initialLayoutConfig, layoutMeta } from "./layout";

export const UIItems = [
  {
    key: "homepage",
    title: "Cấu hình trang chủ",
  },
  {
    key: "layout",
    title: "Cấu hình layout",
  },
];

export const initUIConfigs = {
  homepage: initialHomepageConfig,
  layout: initialLayoutConfig,
};

export const uiMeta = {
  homepage: homepageMeta,
  layout: layoutMeta,
};
