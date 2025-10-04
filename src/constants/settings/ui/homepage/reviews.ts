import { ConfigValue } from "@/types/configs";
import { FieldType, MetaValue } from "@/types/settings";

const fields: FieldType[] = [
  {
    key: "title",
    type: "array",
    label: "Tiêu đề",
    description: "Tiêu đề lớn trên phần Reviews",
    isEditableList: true,
    isRequired: true,
    itemType: {
      type: "object",
      fields: [
        {
          key: "text",
          type: "text",
          label: "Tiêu đề",
          description: "Tiêu đề hiển thị trên phần Reviews",
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
    description: "Tiêu đề phụ nhỏ hiển thị trên phần Reviews",
    isEditableList: true,
    isRequired: true,
    itemType: {
      type: "object",
      fields: [
        {
          key: "text",
          type: "text",
          label: "Tiêu đề phụ",
          description: "Tiêu đề phụ hiển thị trên phần Reviews",
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
    description: "Mô tả ngắn gọn về phần Reviews",
    isRequired: false,
    placeholder: "Nhập mô tả",
  },
];

export const reviewsMeta: MetaValue = {
  key: "reviews",
  title: "Phần Reviews",
  description: "Cấu hình phần Reviews trên trang chủ",
  fields,
};

export const reviewsInitValue: ConfigValue = {
  title: [
    {
      text: "What Our Customers Say",
    },
  ],
  sub_title: [
    {
      text: "Customer Reviews",
    },
  ],
  description: "Chúng tôi yêu thích nhận được phản hồi từ khách hàng!",
};
