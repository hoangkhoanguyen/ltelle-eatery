import React from "react";
import { BasicTable } from "../../ui/table";
import { createColumnHelper } from "@tanstack/react-table";
import { IconButton } from "../../ui/button";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/constants/route";
import { AdminOrderTable } from "@/types/orders";
import moment from "moment";
import { ORDER_STATUS, ORDER_TYPE } from "@/constants/orders";
const columnHelper = createColumnHelper<AdminOrderTable>();

export default function OrderTable({
  data,
  onReloadData,
  loading,
}: {
  data: AdminOrderTable[];
  onReloadData(): void;
  loading?: boolean;
}) {
  const route = useRouter();

  const columns = [
    columnHelper.accessor("id", {
      header: () => <IconButton onClick={onReloadData} icon="mdi:reload" />,
      cell(props) {
        return (
          <IconButton
            icon="ph:eye"
            onClick={() => route.push(adminRoutes.order(props.getValue()))}
          />
        );
      },
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell(props) {
        const value = props.getValue();
        return (
          <span className={`badge badge-soft ${ORDER_STATUS[value].color}`}>
            {ORDER_STATUS[value].label}
          </span>
        );
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("code", {
      header: "Order Code",
      meta: {
        align: "center",
      },
    }),
    columnHelper.accessor("customerName", {
      header: "Customer Name",
    }),
    columnHelper.accessor("customerPhone", {
      header: "Customer Phone",
    }),
    columnHelper.accessor("orderType", {
      header: "Order Type",
      cell(props) {
        const value = props.getValue();
        return (
          <span className={`badge badge-soft ${ORDER_TYPE[value].color}`}>
            {ORDER_TYPE[value].label}
          </span>
        );
      },
    }),

    columnHelper.accessor("totalPrice", {
      header: "Total Price (VNĐ)",
      cell(props) {
        return props.getValue()?.toLocaleString();
      },
      meta: {
        align: "right",
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell(props) {
        return moment(props.getValue()).format("DD/MM/YYYY hh:mm A");
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
