import { updateOrderStatusAction } from "@/actions/admin/order";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatusAction,
  });
};

export default useUpdateOrderStatus;
