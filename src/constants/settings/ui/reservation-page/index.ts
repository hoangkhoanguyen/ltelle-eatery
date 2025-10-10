import { MetaValue } from "@/types/settings";
import { heroInitConfigValue, heroMeta } from "./hero";
import { bookingInitConfigValue, bookingMeta } from "./booking";
import { NewConfigDB } from "@/db/schemas";

export const reservationPageMeta: MetaValue[] = [heroMeta, bookingMeta];

export const initialReservationPageConfig: NewConfigDB = {
  key: "reservation_page",
  title: "Cấu hình trang Đặt bàn",
  config_type: "ui",
  description: "Cấu hình các phần giao diện của trang Đặt bàn",
  value: {
    hero: heroInitConfigValue,
    booking: bookingInitConfigValue,
  },
};
