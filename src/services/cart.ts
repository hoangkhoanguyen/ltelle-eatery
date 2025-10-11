import { getDb } from "@/db/drizzle";
import { productAddons, productImages } from "@/db/schemas";
import { ProductAddOnDB, WebProduct } from "@/types/products";
import { asc } from "drizzle-orm";

export async function checkCartLength({
  productIds,
}: {
  productIds: number[];
}) {
  if (!productIds.length) return 0; // Tránh query không cần thiết
  const db = getDb();
  const products = await db.query.products.findMany({
    where(fields, operators) {
      return operators.inArray(fields.id, productIds);
    },
    columns: { id: true },
  });

  const validProductIds = new Set(products.map((p) => p.id));
  const count = productIds.filter((id) => validProductIds.has(id)).length;
  return count;
}

export async function getCartProductsByIds(ids: number[]): Promise<
  (Pick<
    WebProduct,
    "id" | "category" | "imageUrl" | "price" | "slug" | "title"
  > & {
    addons: Pick<ProductAddOnDB, "id" | "name" | "price">[];
  })[]
> {
  if (!ids.length) return []; // Tránh query không cần thiết

  const db = getDb();

  const productList = await db.query.products.findMany({
    where(fields, { and, eq, inArray }) {
      return and(eq(fields.isActive, true), inArray(fields.id, ids));
    },
    columns: {
      id: true,
      title: true,
      price: true,
      slug: true,
    },
    with: {
      images: {
        columns: {
          url: true,
          altText: true,
        },
        orderBy: [asc(productImages.sortOrder)],
        limit: 1,
      },
      category: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      addons: {
        where(fields, operators) {
          const { eq } = operators;
          return eq(fields.isActive, true);
        },
        orderBy: [asc(productAddons.sortOrder)],
        columns: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return productList.map((product) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    imageUrl: product.images[0]?.url || "",
    category: product.category?.name || "",
    addons: product.addons,
  }));
}
