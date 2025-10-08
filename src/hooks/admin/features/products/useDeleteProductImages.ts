import { deleteProductImagesAction } from "@/actions/admin/product";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteProductImages() {
  return useMutation({
    mutationFn: deleteProductImagesAction,
    onSuccess(data) {
      if (data.success) toast.success("Delete product images successfully");
      else toast.error("Failed to delete product images");
    },
  });
}
