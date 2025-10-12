import { withError } from "@/providers/withError";
import { getCategoryWithProductsCached } from "@/services/products";
import { NextRequest, NextResponse } from "next/server";

const getCategoryByIdApi = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        category: null,
        error: "Invalid category ID",
      },
      { status: 200 },
    );
  }

  const category = await getCategoryWithProductsCached(id);

  if (!category) {
    return NextResponse.json(
      {
        category: null,
        error: "Category not found",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ category });
};

export const GET = withError(getCategoryByIdApi);
