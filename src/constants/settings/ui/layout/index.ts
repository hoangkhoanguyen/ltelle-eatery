import { NewUIConfigDB } from "@/db/schemas";
import { footerInitialValue, footerMeta } from "./footer";
import { headerInitValue, headerMeta } from "./header";
import { MetaValue } from "@/types/settings";

export const layoutMeta: MetaValue[] = [headerMeta, footerMeta];

export const initialLayoutConfig: NewUIConfigDB = {
  key: "layout",
  title: "Cấu hình layout",
  scope: "website",
  description: "Cấu hình các phần giao diện của layout (Header, Footer)",
  value: {
    header: headerInitValue,
    footer: footerInitialValue,
  },
};
