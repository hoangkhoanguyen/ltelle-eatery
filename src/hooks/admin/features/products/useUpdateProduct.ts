import { updateProductAction } from "@/actions/admin/product";
import useCustomActionState from "@/hooks/common/useCustomActionState";

export default function useUpdateProduct() {
  return useCustomActionState(updateProductAction);
}
