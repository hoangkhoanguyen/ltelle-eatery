import { withError } from "@/providers/withError";
import { getAllProductCategories } from "@/services/products";
import { NextResponse } from "next/server";

const getAllCategoriesApi = async () => {
  const categories = await getAllProductCategories();

  return NextResponse.json({ categories });
};

export const GET = withError(getAllCategoriesApi);
