import { addProductCategoryAction } from "@/actions/admin/category";
import useCustomActionState from "@/hooks/common/useCustomActionState";

export default function useAddProductCategory() {
  return useCustomActionState(addProductCategoryAction);
}
