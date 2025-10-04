import { heroInitValue, heroMeta } from "./hero";
import { MetaValue } from "@/types/settings";
import { introductionInitValue, introductionMeta } from "./introduction";
import { foodCategoriesInitValue, foodCategoriesMeta } from "./food-categories";
import { newProductInitValue, newProductMeta } from "./new-product";
import { NewUIConfigDB } from "@/db/schemas";
import { whyChooseUsInitialValue, whyChooseUsMeta } from "./why-choose-us";

export const menuPageMeta: MetaValue[] = [
  heroMeta,
  introductionMeta,
  foodCategoriesMeta,
  newProductMeta,
  whyChooseUsMeta,
];

export const initialMenuPageConfig: NewUIConfigDB = {
  key: "menu_page",
  title: "Cấu hình trang Menu",
  scope: "website",
  description: "Cấu hình các phần giao diện của trang Menu",
  value: {
    hero: heroInitValue,
    introduction: introductionInitValue,
    food_categories: foodCategoriesInitValue,
    new_product: newProductInitValue,
    why_choose_us: whyChooseUsInitialValue,
  },
};
