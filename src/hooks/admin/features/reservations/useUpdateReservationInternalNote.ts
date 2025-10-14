import { updateReservationInternalNoteAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateReservationInternalNote = () => {
  return useMutation({
    mutationFn: updateReservationInternalNoteAction,
    onSuccess(data) {
      if (data.success) {
        toast.success("Cập nhật ghi chú đặt bàn thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useUpdateReservationInternalNote;
