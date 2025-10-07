import { updateReservationStatusAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";

const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: updateReservationStatusAction,
  });
};

export default useUpdateReservationStatus;
