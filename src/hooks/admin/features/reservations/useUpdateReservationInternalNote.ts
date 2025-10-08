import { updateReservationInternalNoteAction } from "@/actions/admin/reservation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateReservationInternalNote = () => {
  return useMutation({
    mutationFn: updateReservationInternalNoteAction,
    onSuccess(data) {
      if (data.success)
        toast.success("Update reservation internal note successfully");
      else toast.error("Failed to update reservation internal note");
    },
  });
};

export default useUpdateReservationInternalNote;
