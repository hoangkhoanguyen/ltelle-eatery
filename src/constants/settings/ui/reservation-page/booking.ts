import { ConfigValue } from "@/types/configs";
import { MetaValue } from "@/types/settings";

export const bookingInitConfigValue: ConfigValue = {
  title: [
    {
      text: "Our Menu Categories",
    },
    {
      text: "Diverse Flavors to Satisfy Every Palate",
    },
  ],
  sub_title: [
    {
      text: "From Appetizers to Desserts",
    },
    {
      text: "A Culinary Adventure Awaits",
    },
  ],
  description:
    "Indulge in a culinary journey through the heart of France with our exquisite menu.",
  reservation_info: [
    {
      icon: "clock",
      title: "Opening Hours",
      items: [
        {
          text: "Mon - Fri: 10:00 AM - 10:00 PM",
        },
      ],
    },
  ],
  contact: {
    phone: "0123456789",
    email: "khoadeptrai@gmail.com",
  },
  note: [
    {
      text: "Please arrive 10 minutes before your reservation time.",
    },
  ],
};

export const bookingMeta: MetaValue = {
  key: "booking",
  title: "Cấu hình phần đặt bàn",
  description: "Cấu hình các phần hiển thị trên phần đặt bàn",
  fields: [
    {
      key: "title",
      type: "array",
      label: "Tiêu đề chính",
      description: "Tiêu đề chính hiển thị trên phần đặt bàn",
      isEditableList: true,
      isRequired: true,
      needBox: true,
      itemType: {
        type: "object",
        fields: [
          {
            key: "text",
            type: "text",
            label: "Tiêu đề",
            description: "Tiêu đề hiển thị trên phần đặt bàn",
            isRequired: true,
            placeholder: "Nhập tiêu đề",
          },
        ],
      },
      newItem: {
        text: "",
      },
    },
    {
      key: "sub_title",
      type: "array",
      label: "Tiêu đề phụ",
      description: "Tiêu đề phụ hiển thị trên phần đặt bàn",
      isEditableList: true,
      isRequired: true,
      needBox: true,
      itemType: {
        type: "object",
        fields: [
          {
            key: "text",
            type: "text",
            label: "Tiêu đề phụ",
            description: "Tiêu đề phụ hiển thị trên phần đặt bàn",
            isRequired: true,
            placeholder: "Nhập tiêu đề phụ",
          },
        ],
      },
      newItem: {
        text: "",
      },
    },
    {
      key: "description",
      type: "textarea",
      label: "Mô tả",
      description: "Mô tả hiển thị trên phần đặt bàn",
      isRequired: true,
      placeholder: "Nhập mô tả",
    },
    {
      key: "reservation_info",
      type: "array",
      label: "Thông tin đặt bàn",
      description: "Thông tin hiển thị trên phần đặt bàn",
      isEditableList: true,
      isRequired: true,
      needBox: true,
      itemType: {
        type: "object",
        fields: [
          {
            key: "icon",
            type: "text",
            label: "Icon",
            description: "Icon hiển thị trên phần đặt bàn",
            isRequired: true,
            placeholder: "Nhập icon",
          },
          {
            key: "title",
            type: "text",
            label: "Tiêu đề",
            description: "Tiêu đề hiển thị trên phần đặt bàn",
            isRequired: true,
            placeholder: "Nhập tiêu đề",
          },
          {
            key: "items",
            type: "array",
            label: "Danh sách thông tin",
            description: "Danh sách thông tin hiển thị trên phần đặt bàn",
            isEditableList: true,
            isRequired: true,
            needBox: true,
            itemType: {
              type: "object",
              fields: [
                {
                  key: "text",
                  type: "text",
                  label: "Nội dung",
                  description: "Nội dung hiển thị trên phần đặt bàn",
                  isRequired: true,
                  placeholder: "Nhập nội dung",
                },
              ],
            },
            newItem: {
              text: "",
            },
          },
        ],
      },
      newItem: {
        icon: "clock",
        title: "",
        items: [
          {
            text: "",
          },
        ],
      },
    },
    {
      key: "contact",
      type: "object",
      label: "Thông tin liên hệ",
      description: "Thông tin liên hệ hiển thị trên phần đặt bàn",
      isRequired: true,
      fields: [
        {
          key: "phone",
          type: "text",
          label: "Số điện thoại",
          description: "Số điện thoại hiển thị trên phần đặt bàn",
          isRequired: true,
          placeholder: "Nhập số điện thoại",
        },
        {
          key: "email",
          type: "text",
          label: "Email",
          description: "Email hiển thị trên phần đặt bàn",
          isRequired: true,
          placeholder: "Nhập email",
        },
      ],
    },
  ],
};
