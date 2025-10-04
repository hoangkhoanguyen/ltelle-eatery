import { homepageMeta, initialHomepageConfig } from "./homepage";
import { initialLayoutConfig, layoutMeta } from "./layout";
import { initialMenuPageConfig, menuPageMeta } from "./menu-page";

export const UIItems = [
  {
    key: "homepage",
    title: "Cấu hình trang chủ",
  },
  {
    key: "layout",
    title: "Cấu hình layout",
  },
  {
    key: "menu_page",
    title: "Cấu hình trang Menu",
  },
];

export const initUIConfigs = {
  homepage: initialHomepageConfig,
  layout: initialLayoutConfig,
  menu_page: initialMenuPageConfig,
};

export const uiMeta = {
  homepage: homepageMeta,
  layout: layoutMeta,
  menu_page: menuPageMeta,
};
