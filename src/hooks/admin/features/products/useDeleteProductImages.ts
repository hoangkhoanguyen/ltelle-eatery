import { deleteProductImagesAction } from "@/actions/admin/product";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteProductImages() {
  return useMutation({
    mutationFn: deleteProductImagesAction,
    onSuccess(data) {
      if (data.success) {
        toast.success("Xóa hình ảnh sản phẩm thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
}
