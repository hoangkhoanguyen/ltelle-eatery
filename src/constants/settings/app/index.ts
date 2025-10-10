import { MetaValue } from "@/types/settings";
import { NewConfigDB } from "@/db/schemas";
import { orderInitConfig, orderMeta } from "./order";

export const APPItems = [
  {
    key: "order",
    title: "Cấu hình đơn hàng",
  },
];

export const initAppConfigs: Record<string, NewConfigDB> = {
  order: orderInitConfig,
};

export const appMeta: Record<string, MetaValue[]> = {
  order: orderMeta,
};
