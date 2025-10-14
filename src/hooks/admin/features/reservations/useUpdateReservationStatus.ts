import { updateReservationStatusAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: updateReservationStatusAction,
    onSuccess(data) {
      if (data.success) {
        toast.success("Cập nhật trạng thái đặt bàn thành công!");
      } else {
        toast.error(data.error || "Có lỗi xảy ra");
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });
};

export default useUpdateReservationStatus;
