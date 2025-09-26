import { updateOrderInternalNoteAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderInternalNote = () => {
  return useMutation({
    mutationFn: updateOrderInternalNoteAction,
  });
};

export default useUpdateOrderInternalNote;
