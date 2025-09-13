"use server";
import { addProductCategory } from "@/services/products";
import { NewProductCategoryDB } from "@/types/products";

export async function addProductCategoryAction(data: NewProductCategoryDB) {
  const newCategory = await addProductCategory(data);
  return { result: "success", data: newCategory };
}
