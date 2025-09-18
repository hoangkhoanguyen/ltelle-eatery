import { withError } from "@/providers/withError";
import { getAllProducts } from "@/services/products";
import { NextResponse } from "next/server";

async function getAllProductsApi() {
  const allProducts = await getAllProducts();

  return NextResponse.json({ allProducts });
}

export const GET = withError(getAllProductsApi);
