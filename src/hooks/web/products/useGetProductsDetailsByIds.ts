import { getCartProductsByIdsAction } from "@/actions/web/cart";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetProductsDetailsByIds = ({ ids }: { ids: number[] }) => {
  const {
    mutate,
    isPending,
    data = [],
  } = useMutation({
    mutationKey: ["get-cart-products-by-ids", { ids }],
    mutationFn: getCartProductsByIdsAction,
  });

  useEffect(() => {
    if (ids.length === 0 || data.length > 0) {
      return;
    }
    mutate({ ids });
  }, [ids, mutate, data.length]);

  return { data, isLoading: isPending };
};

export default useGetProductsDetailsByIds;
