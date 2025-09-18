import { addProductCategoryAction } from "@/actions/admin/category";
import { useMutation } from "@tanstack/react-query";
import { useCategorySuccess } from "./useFetchAllCategories";

export default function useAddProductCategory() {
  const { onAddSuccess } = useCategorySuccess();
  return useMutation({
    mutationFn: addProductCategoryAction,
    onSuccess(data) {
      onAddSuccess(data.newCategory);
    },
  });
}
