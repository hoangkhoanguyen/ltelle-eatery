import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductCategoryAction } from "@/actions/admin/category";
import { NewProductCategoryDB } from "@/types/products";
import { toast } from "sonner";

interface UpdateCategoryParams {
  id: number;
  data: Partial<NewProductCategoryDB>;
}

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryParams) =>
      updateProductCategoryAction(id, data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Cập nhật danh mục thành công!");
        // Invalidate categories list and detail
        queryClient.invalidateQueries({
          queryKey: ["admin", "categories"],
        });
      } else {
        toast.error(result.error || "Có lỗi xảy ra");
      }
    },
    onError: (error) => {
      console.error("Update category error:", error);
      toast.error("Có lỗi xảy ra khi cập nhật danh mục");
    },
  });
};

export default useUpdateCategory;
