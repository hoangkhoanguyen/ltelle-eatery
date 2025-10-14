import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductCategoryAction } from "@/actions/admin/category";
import { NewProductCategoryDB } from "@/types/products";
import { toast } from "sonner";

const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: NewProductCategoryDB) => addProductCategoryAction(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Tạo danh mục thành công!");
      } else {
        toast.error(result.error || "Có lỗi xảy ra");
      }
    },
    onError: (error) => {
      console.error("Create category error:", error);
      toast.error("Có lỗi xảy ra khi tạo danh mục");
    },
  });
};

export default useCreateCategory;
