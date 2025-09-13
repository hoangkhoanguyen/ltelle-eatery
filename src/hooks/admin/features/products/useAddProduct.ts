import { createProductAction } from "@/actions/admin/product";
import useCustomActionState from "@/hooks/common/useCustomActionState";

export default function useAddProduct() {
  return useCustomActionState(createProductAction);
}
