import { updateOrderInternalNoteAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateOrderInternalNote = () => {
  return useMutation({
    mutationFn: updateOrderInternalNoteAction,
    onSuccess(data) {
      if (data.success) {
        toast.success("Cập nhật ghi chú đơn hàng thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useUpdateOrderInternalNote;
