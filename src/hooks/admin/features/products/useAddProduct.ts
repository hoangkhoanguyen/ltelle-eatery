import { createProductAction } from "@/actions/admin/product";
import { useMutation } from "@tanstack/react-query";

export default function useAddProduct() {
  return useMutation({
    mutationFn: createProductAction,
  });
}
