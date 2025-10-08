import { updateOrderStatusAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatusAction,
    onSuccess(data) {
      if (data.success) toast.success("Update order status successfully");
      else toast.error("Failed to update order status");
    },
  });
};

export default useUpdateOrderStatus;
