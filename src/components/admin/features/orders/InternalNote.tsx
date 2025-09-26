"use client";
import React, { FC, useRef, useState } from "react";
import { Button, IconButton } from "../../ui/button";
import { AdminOrderDetails } from "@/types/orders";
import { LayoutRef, LayoutWithRef, Modal } from "../../ui/layout";
import { Textarea } from "../../ui/form";
import useUpdateOrderInternalNote from "@/hooks/admin/features/orders/useUpdateOrderInternalNote";

const InternalNote: FC<{
  data: Pick<AdminOrderDetails, "internalNote" | "id">;
}> = ({ data }) => {
  const [note, setNote] = useState(data.internalNote || "");
  const ref = useRef<LayoutRef>(null);

  const { mutate, isPending } = useUpdateOrderInternalNote();

  const onAfterClose = () => {
    setNote(data.internalNote || "");
  };

  return (
    <>
      <div className="card card-body bg-white">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Internal Note</h2>
          <IconButton icon="tabler:edit" onClick={() => ref.current?.open()} />
        </div>
        <div className="mt-4">
          <p className="text-gray-700">{data.internalNote || "--/--"}</p>
        </div>
      </div>
      <LayoutWithRef ref={ref} Component={Modal} afterClose={onAfterClose}>
        <div className="card card-body bg-white w-xs sm:w-sm md:w-md lg:w-2xl">
          <h2 className="card-title">Edit Internal Note</h2>
          <Textarea
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            defaultValue={data.internalNote || ""}
            placeholder="Enter internal note"
          />
          <div className="card-actions justify-end mt-4">
            <Button disabled={isPending} onClick={() => ref.current?.close()}>
              Close
            </Button>
            <Button
              disabled={isPending}
              color="primary"
              onClick={() => {
                mutate({ orderId: data.id, internalNote: note });
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </LayoutWithRef>
    </>
  );
};

export default InternalNote;
