import { MetaValue } from "@/types/settings";
import { heroInitConfigValue, heroMeta } from "./hero";
import { bookingInitConfigValue, bookingMeta } from "./booking";
import { NewUIConfigDB } from "@/db/schemas";

export const reservationPageMeta: MetaValue[] = [heroMeta, bookingMeta];

export const initialReservationPageConfig: NewUIConfigDB = {
  key: "reservation_page",
  title: "Cấu hình trang Đặt bàn",
  scope: "website",
  description: "Cấu hình các phần giao diện của trang Đặt bàn",
  value: {
    hero: heroInitConfigValue,
    booking: bookingInitConfigValue,
  },
};
