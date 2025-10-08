import { updateProductAction } from "@/actions/admin/product";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProductAction,
    onSuccess(data) {
      if (data.success) toast.success("Update product successfully");
      else toast.error("Failed to update product");
    },
  });
}
