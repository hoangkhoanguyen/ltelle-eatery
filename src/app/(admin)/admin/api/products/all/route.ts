import { withError } from "@/providers/withError";
import { getAllProductsCached } from "@/services/products";
import { NextResponse } from "next/server";

async function getAllProductsApi() {
  const allProducts = await getAllProductsCached();

  return NextResponse.json({ allProducts });
}

export const GET = withError(getAllProductsApi);
