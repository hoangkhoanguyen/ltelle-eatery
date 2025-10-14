import { updateProductStatusAction } from "@/actions/admin/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProductStatus() {
  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      updateProductStatusAction(id, isActive),
    onSuccess(data) {
      if (data.success) {
        toast.success(
          data.data?.message || "Cập nhật trạng thái sản phẩm thành công!",
        );
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái sản phẩm");
    },
  });
}
