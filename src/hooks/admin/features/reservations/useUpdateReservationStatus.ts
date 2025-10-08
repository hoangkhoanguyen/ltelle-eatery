import { updateReservationStatusAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: updateReservationStatusAction,
    onSuccess(data) {
      if (data.success) toast.success("Update reservation status successfully");
      else toast.error("Failed to update reservation status");
    },
  });
};

export default useUpdateReservationStatus;
