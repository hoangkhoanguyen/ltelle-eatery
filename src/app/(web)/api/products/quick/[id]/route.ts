import { withError } from "@/providers/withError";
import { getProductDetailsForQuickCartById } from "@/services/products";
import { NextRequest, NextResponse } from "next/server";

const getProductQuickCart = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const product = await getProductDetailsForQuickCartById(Number(id));

  return NextResponse.json({
    product: product
      ? {
          ...product,
          category: product.category.name,
        }
      : null,
  });
};

export const GET = withError(getProductQuickCart);
