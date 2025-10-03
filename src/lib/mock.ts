import { UIConfigDB } from "@/db/schemas";

// data giả từ db lấy theo category homepage
export const homepageConfigs: UIConfigDB = {
  key: "homepage",
  title: "Cấu hình trang chủ",
  scope: "website",
  description: "Cấu hình các phần giao diện của trang chủ",
  value: {
    hero: {
      title: [{ title: "L'Telle Eatery" }, { title: "Nhà hàng hảo hạng" }],
      description: "Nhà hàng hảo hạng với các món ăn tuyệt vời",
      image: {
        url: "/assets/static/hero.jpg",
        alt: "Hero Image",
      },
      blur: true,
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
