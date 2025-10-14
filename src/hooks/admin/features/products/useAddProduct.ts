import { createProductAction } from "@/actions/admin/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useAddProduct() {
  return useMutation({
    mutationFn: createProductAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Tạo sản phẩm thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
}
