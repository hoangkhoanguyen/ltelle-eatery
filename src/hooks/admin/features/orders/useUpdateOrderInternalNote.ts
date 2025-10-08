import { updateOrderInternalNoteAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateOrderInternalNote = () => {
  return useMutation({
    mutationFn: updateOrderInternalNoteAction,
    onSuccess(data) {
      if (data.success)
        toast.success("Update order internal note successfully");
      else toast.error("Failed to update order internal note");
    },
  });
};

export default useUpdateOrderInternalNote;
