import { webRoutes } from "@/constants/route";
import { ConfigValue } from "@/types/configs";
import { MetaValue } from "@/types/settings";

export const footerInitialValue: ConfigValue = {
  description:
    "Experience authentic French cuisine in the heart of Ha Giang. Our commitment to excellence and hospitality makes every visit memorable.",
  socials: [
    {
      icon: "ph:facebook-logo",
      href: "facebook.com",
    },
    {
      icon: "ph:instagram-logo",
      href: "instagram.com",
    },
    {
      icon: "ph:twitter-logo",
      href: "twitter.com",
    },
  ],
  quick_links: [
    { label: "Home", href: webRoutes.home(), title: "Welcome to Our Table" },
    { label: "Menu", href: webRoutes.menu("all"), title: "Explore Our Menu" },
    {
      label: "Reservations",
      href: webRoutes.reservation(),
      title: "Book a Table",
    },
    { label: "Contact", href: webRoutes.contact(), title: "Get in Touch" },
  ],
  services: [
    { label: "Private Event Catering" },
    { label: "Wine Pairing Dinners" },
    { label: "Corporate Events" },
    { label: "Fine Dining Experience" },
    { label: "Special Celebrations" },
  ],
  contact: {
    address: "123 Culinary St, Ha Giang, Vietnam",
    phone: "(123) 456-7890",
    email: "info@restaurant.com",
  },
  opening_hours: [
    {
      text: "Mon - Fri: 10:00 AM - 10:00 PM",
    },
    {
      text: "Sat - Sun: 9:00 AM - 11:00 PM",
    },
  ],
};

export const footerMeta: MetaValue = {
  title: "Footer",
  description: "Footer section of the website",
  key: "footer",
  fields: [
    {
      key: "description",
      label: "Đoạn mô tả bên dưới logo",
      type: "text",
      description: "Mô tả hiển thị bên dưới logo trong phần footer",
      isRequired: false,
    },
    {
      key: "socials",
      label: "Social Links",
      type: "array",
      description:
        "Danh sách các liên kết mạng xã hội hiển thị trong phần footer",
      isEditableList: true,
      isRequired: false,
      needBox: true,
      itemType: {
        type: "object",
        needBox: true,
        fields: [
          {
            key: "icon",
            label: "Icon",
            type: "text",
            description:
              "Vào link https://icon-sets.iconify.design để lấy tên icon",
            isRequired: true,
            placeholder: "Nhập tên icon",
          },
          {
            key: "href",
            label: "URL",
            type: "text",
            description: "Đường dẫn đến trang mạng xã hội",
            isRequired: true,
            placeholder: "Nhập URL",
          },
        ],
      },
      newItem: {
        icon: "",
        href: "",
      },
    },
    {
      key: "quick_links",
      label: "Quick Links",
      type: "array",
      description: "Danh sách các liên kết nhanh hiển thị trong phần footer",
      isEditableList: false,
      isRequired: false,
      needBox: true,
      itemType: {
        type: "object",
        needBox: true,
        fields: [
          {
            key: "label",
            label: "Label",
            type: "text",
            description: "Tên hiển thị của liên kết",
            isRequired: true,
            placeholder: "Nhập tên liên kết",
          },
          {
            key: "href",
            label: "URL",
            type: "text",
            description: "Đường dẫn của liên kết",
            isRequired: true,
            placeholder: "Nhập URL",
            disabled: true,
          },
          {
            key: "title",
            label: "Title",
            type: "text",
            description:
              "Tiêu đề hiển thị khi hover vào liên kết (dùng cho SEO)",
            isRequired: true,
            placeholder: "Nhập tiêu đề",
          },
        ],
      },
      newItem: {
        label: "",
        href: "",
      },
    },
    {
      key: "services",
      label: "Services",
      type: "array",
      description: "Danh sách các dịch vụ hiển thị trong phần footer",
      isEditableList: true,
      isRequired: false,
      itemType: {
        type: "object",
        needBox: true,
        fields: [
          {
            key: "label",
            label: "Tên hiển thị",
            type: "text",
            description: "Tên hiển thị của dịch vụ",
            isRequired: true,
            placeholder: "Nhập tên dịch vụ",
          },
        ],
      },
      newItem: {
        label: "",
      },
    },
    {
      key: "contact",
      label: "Contact Information",
      type: "object",
      description: "Thông tin liên hệ hiển thị trong phần footer",
      isRequired: false,
      needBox: true,
      fields: [
        {
          key: "address",
          label: "Address",
          type: "textarea",
          description: "Địa chỉ liên hệ",
          isRequired: false,
        },
        {
          key: "phone",
          label: "Phone",
          type: "text",
          description: "Số điện thoại liên hệ",
          isRequired: false,
        },
        {
          key: "email",
          label: "Email",
          type: "text",
          description: "Email liên hệ",
          isRequired: false,
        },
      ],
    },
    {
      key: "opening_hours",
      label: "Opening Hours",
      type: "array",
      description: "Danh sách thông tin giờ mở cửa hiển thị trong phần footer",
      isEditableList: true,
      isRequired: false,
      itemType: {
        type: "object",
        fields: [
          {
            key: "text",
            label: "Text",
            type: "text",
            description: "Nội dung giờ mở cửa",
            isRequired: true,
            placeholder: "Nhập nội dung giờ mở cửa",
          },
        ],
      },
      newItem: {
        text: "",
      },
    },
  ],
};
