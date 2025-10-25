import { getCartProductsByIdsAction } from "@/actions/web/cart";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const useGetProductsDetailsByIds = ({ ids }: { ids: number[] }) => {
  const [isFetched, setIsFetched] = useState(false); // Trạng thái đã fetch xong
  const [isIdsLoaded, setIsIdsLoaded] = useState(false); // Trạng thái ids đã load xong

  const {
    mutate,
    isPending,
    data = [],
  } = useMutation({
    mutationKey: ["get-cart-products-by-ids", { ids }],
    mutationFn: getCartProductsByIdsAction,
    onSuccess: () => {
      setIsFetched(true); // Đánh dấu đã fetch xong
    },
  });

  useEffect(() => {
    if (!isIdsLoaded) {
      // Đánh dấu ids đã load xong
      setIsIdsLoaded(true);
    }

    if (isIdsLoaded && ids.length > 0 && !isFetched) {
      // Fetch dữ liệu nếu ids đã load xong và chưa fetch
      mutate({ ids });
    }

    if (isIdsLoaded && ids.length === 0) {
      // Nếu ids rỗng sau khi load, đánh dấu là đã fetch xong
      setIsFetched(true);
    }
  }, [ids, isIdsLoaded, isFetched, mutate]);

  // Cập nhật isLoading để xử lý đúng trường hợp ids rỗng

  const isLoading = useMemo(
    () =>
      !isIdsLoaded ||
      (!isFetched && ids.length > 0) ||
      (isPending && ids.length > 0),
    [isIdsLoaded, isFetched, ids.length, isPending],
  );

  return { data, isLoading };
};

export default useGetProductsDetailsByIds;

/**
 * nếu đã fetch rồi thì thôi
 * nếu ids rỗng thì thôi
 * mỗi lần ids thay đổi thì fetch lại
 *
 *
 *
 * nếu đã fetch thì hiển thị rỗng hoặc data
 * nếu chưa fetch hoặc loading thì hiển thị loading
 *
 * hiển thị data khi: đã fetch xong và
 */
