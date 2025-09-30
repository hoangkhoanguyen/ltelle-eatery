import { UIConfigDB } from "@/db/schemas";

// data giả từ db lấy theo category homepage
export const homepageConfigs: UIConfigDB = {
  key: "homepage",
  title: "Cấu hình trang chủ",
  scope: "website",
  description: "Cấu hình các phần giao diện của trang chủ",
  value: {
    hero: {
      title: {
        value: [{ value: "L'Telle Eatery" }, { value: "Nhà hàng hảo hạng" }],
      },
      description: { value: "Nhà hàng hảo hạng với các món ăn tuyệt vời" },
      image: {
        value: {
          url: "/assets/static/hero.jpg",
          alt: "Hero Image",
        },
      },
      blur: { value: true },
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
