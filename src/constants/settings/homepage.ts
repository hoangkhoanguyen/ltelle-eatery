import { FieldType, MetaType } from "@/types/settings";

// Cấu hình các trường cho phần hero được ghi sẵn trong code
const heroFields: FieldType[] = [
  {
    key: "title",
    type: "array",
    label: "Tiêu đề",
    description: "Tiêu đề hiển thị trên phần hero",
    isAlwaysShow: true,
    canAdd: true,
    isRequired: true,
    itemType: {
      type: "text",
      placeholder: "Nhập tiêu đề",
    },
  },
  {
    key: "description",
    type: "text",
    label: "Mô tả",
    description: "Mô tả hiển thị trên phần hero",
    isAlwaysShow: true,
    isRequired: true,
    placeholder: "Nhập mô tả",
  },
  {
    key: "image",
    type: "image",
    label: "Ảnh nền",
    description: "Ảnh nền hiển thị trên phần hero",
    isAlwaysShow: true,
    isRequired: false,
  },
  {
    key: "blur",
    type: "boolean",
    label: "Chế độ làm mờ",
    description: "Bật chế độ làm mờ cho phần hero",
    isAlwaysShow: true,
    isRequired: false,
  },
];

// cấu hình cho homepage được ghi sẵn trong code
export const homepageMeta: MetaType = {
  hero: {
    title: "Phần Hero",
    description: "Cấu hình phần hero của trang chủ",
    fields: heroFields,
  },
  // future sections can be added here
};
