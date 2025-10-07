import { updateReservationInternalNoteAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";

const useUpdateReservationInternalNote = () => {
  return useMutation({
    mutationFn: updateReservationInternalNoteAction,
  });
};

export default useUpdateReservationInternalNote;
