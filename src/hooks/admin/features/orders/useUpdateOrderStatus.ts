import { updateOrderStatusAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatusAction,
    onSuccess(data) {
      if (data.success) {
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useUpdateOrderStatus;
