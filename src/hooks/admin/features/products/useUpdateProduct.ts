import { updateProductAction } from "@/actions/admin/product";

import { useMutation } from "@tanstack/react-query";

export default function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProductAction,
  });
}
