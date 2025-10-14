import React from "react";
import { BasicTable } from "../../ui/table";
import { createColumnHelper } from "@tanstack/react-table";
import { AdminProductTable } from "@/types/products";
import { IconButton } from "../../ui/button";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/constants/route";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Switch } from "../../ui/form";
import useUpdateProductStatus from "@/hooks/admin/features/products/useUpdateProductStatus";
const columnHelper = createColumnHelper<AdminProductTable>();

export default function ProductTable({
  data,
  onReloadData,
  loading,
}: {
  data: AdminProductTable[];
  onReloadData(): void;
  loading?: boolean;
}) {
  const route = useRouter();
  const updateProductStatus = useUpdateProductStatus();

  const columns = [
    columnHelper.accessor("id", {
      header: () => <IconButton onClick={onReloadData} icon="mdi:reload" />,
      cell(props) {
        return (
          <IconButton
            icon="tabler:edit"
            onClick={() => route.push(adminRoutes.product(props.getValue()))}
          />
        );
      },
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("imageUrl", {
      header: "Hình ảnh",
      cell(props) {
        return (
          <Image src={props.getValue() || ""} alt="" width={64} height={64} />
        );
      },
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("title", {
      header: "Tên",
    }),
    columnHelper.accessor("slug", {
      header: "Đường dẫn",
      cell: (props) => {
        const slug = props.getValue();
        return (
          <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {slug}
          </span>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Nhóm",
    }),
    columnHelper.accessor("price", {
      header: "Giá (VNĐ)",
      cell(props) {
        return props.getValue()?.toLocaleString();
      },
      meta: {
        align: "right",
      },
    }),
    columnHelper.accessor("isActive", {
      header: "Trạng thái",
      cell(props) {
        const isActive = props.getValue();
        const productId = props.row.original.id;
        
        return (
          <Switch
            checked={isActive}
            onChange={(e) => {
              const newStatus = e.target.checked;
              updateProductStatus.mutate(
                { id: productId, isActive: newStatus },
                {
                  onSuccess: () => {
                    onReloadData();
                  },
                }
              );
            }}
            disabled={updateProductStatus.isPending}
          />
        );
      },
      meta: {
        align: "center",
      },
    }),
  ];
  return (
    <BasicTable
      columns={columns}
      data={data}
      className="flex-1 bg-white rounded-xl"
      loading={loading}
    />
  );
}
