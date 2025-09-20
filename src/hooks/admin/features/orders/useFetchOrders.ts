import { adminRoutes } from "@/constants/route";
import adminApi from "@/lib/api/axios";
import { AdminProductTableApi } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

const useFetchOrders = (query: any) => {
  return useQuery({
    queryKey: ["admin", "product", query],
    queryFn: (): Promise<{ products: AdminProductTableApi[]; total: number }> =>
      adminApi.get(adminRoutes.productsApi(query)),
  });
};

export default useFetchOrders;
