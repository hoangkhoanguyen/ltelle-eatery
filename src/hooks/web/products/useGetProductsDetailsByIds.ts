import { webRoutes } from "@/constants/route";
import { webApi } from "@/lib/api/axios";
import { ProductAddOnDB, WebProduct } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

const useGetProductsDetailsByIds = ({ ids }: { ids: number[] }) => {
  return useQuery({
    queryKey: ["web", "products", "details", "by-ids", { ids }],
    queryFn: (): Promise<{
      products: (Pick<
        WebProduct,
        "id" | "category" | "imageUrl" | "price" | "slug" | "title"
      > & {
        addons: Pick<ProductAddOnDB, "id" | "name" | "price">[];
      })[];
    }> => webApi.get(webRoutes.productsByIdsApi({ ids })),
    select(data) {
      return data.products;
    },
  });
};

export default useGetProductsDetailsByIds;
