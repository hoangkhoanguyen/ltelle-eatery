import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminCreateProductCategoryForm } from "@/types/products";
import { productCategorySchema } from "@/validations/product";

const useCreateCategoryForm = () => {
  return useForm<AdminCreateProductCategoryForm>({
    mode: "onSubmit",
    resolver: zodResolver(productCategorySchema),
  });
};

export default useCreateCategoryForm;
