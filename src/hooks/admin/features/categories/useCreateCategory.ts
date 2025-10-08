import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductCategoryAction } from "@/actions/admin/category";
import { NewProductCategoryDB } from "@/types/products";
import { toast } from "sonner";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewProductCategoryDB) => addProductCategoryAction(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Tạo danh mục thành công!");
        // Invalidate categories list
        queryClient.invalidateQueries({
          queryKey: ["admin", "categories"],
        });
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
