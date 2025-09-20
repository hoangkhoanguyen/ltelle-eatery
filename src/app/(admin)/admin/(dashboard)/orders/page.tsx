"use client";
import OrderFilter from "@/components/admin/features/orders/OrderFilter";
import OrderTable from "@/components/admin/features/orders/OrderTable";
import FilterTag from "@/components/admin/shared/FilterTag";
import Header from "@/components/admin/shared/header/Header";
import SearchInput from "@/components/admin/shared/SearchInput";
import Pagination from "@/components/admin/ui/table/Pagination";
import useFetchOrders from "@/hooks/admin/features/orders/useFetchOrders";
import useOrdersParams from "@/hooks/admin/features/orders/useOrdersParams";
import { AdminProductTable } from "@/types/products";
import React, { useMemo } from "react";

const ProductPage = () => {
  const { query, setQuery } = useOrdersParams();

  const { data, refetch, isPending, isRefetching } = useFetchOrders(query);

  const convertedData: AdminProductTable[] = useMemo(
    () =>
      data?.products.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category.name,
        imageUrl: item.images[0]?.url,
        isActive: item.isActive,
      })) || [],
    [data],
  );

  return (
    <div className="container px-5 pb-5 mx-auto flex flex-col gap-4 min-h-screen">
      <Header
        title="Danh sách đơn hàng"
        center={
          <div className="flex-1 px-7">
            <SearchInput
              className="input-sm"
              onSubmit={(search) => {
                setQuery({
                  search,
                });
              }}
            />
          </div>
        }
        actions={
          <div className="flex gap-2">
            <OrderFilter />
          </div>
        }
      />
      <div className="flex gap-2 flex-wrap">
        {/* {query.isActive !== null && (
          <FilterTag
            onRemove={() =>
              setQuery({
                isActive: null,
              })
            }
            label="Trạng thái"
            value={query.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
          />
        )} */}
      </div>

      <OrderTable
        data={convertedData}
        onReloadData={() => {
          refetch();
        }}
        loading={isPending || isRefetching}
      />

      <Pagination
        className="self-center"
        currentPage={query.page}
        totalPages={data?.total || 0}
        onPageChange={(page) => {
          setQuery({
            page,
          });
        }}
      />
    </div>
  );
};

export default ProductPage;
