import { MetaValue } from "@/types/settings";
import { heroInitialValue, heroMeta } from "./hero";
import { NewUIConfigDB } from "@/db/schemas";
import { ourStoryInitialValue, ourStoryMeta } from "./our-story";
import { whyChooseUsInitialValue, whyChooseUsMeta } from "./why-choose-us";
import { galleryInitValue, galleryMeta } from "./gallery";
import { reviewsInitValue, reviewsMeta } from "./reviews";
import { contactInitValue, contactMeta } from "./contact";

export const homepageMeta: MetaValue[] = [
  heroMeta,
  ourStoryMeta,
  whyChooseUsMeta,
  galleryMeta,
  reviewsMeta,
  contactMeta,
];

export const initialHomepageConfig: NewUIConfigDB = {
  key: "homepage",
  title: "Cấu hình trang chủ",
  scope: "website",
  description: "Cấu hình các phần giao diện của trang chủ",
  value: {
    hero: heroInitialValue,
    our_story: ourStoryInitialValue,
    why_choose_us: whyChooseUsInitialValue,
    gallery: galleryInitValue,
    reviews: reviewsInitValue,
    contact: contactInitValue,
  },
};
