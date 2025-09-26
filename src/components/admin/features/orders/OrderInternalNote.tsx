"use client";
import React, { FC } from "react";
import { AdminOrderDetails } from "@/types/orders";
import useUpdateOrderInternalNote from "@/hooks/admin/features/orders/useUpdateOrderInternalNote";
import InternalNote from "../../shared/InternalNote";

const OrderInternalNote: FC<{
  data: Pick<AdminOrderDetails, "internalNote" | "id">;
}> = ({ data }) => {
  const { mutate, isPending } = useUpdateOrderInternalNote();

  return (
    <>
      <InternalNote
        initNote={data.internalNote || ""}
        onSubmit={(note) => mutate({ orderId: data.id, internalNote: note })}
        isPending={isPending}
      />
    </>
  );
};

export default OrderInternalNote;
