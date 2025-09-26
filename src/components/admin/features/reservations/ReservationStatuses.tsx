"use client";
import React, { ComponentProps, FC, useMemo } from "react";
import { Button } from "../../ui/button";
import useUpdateOrderStatus from "@/hooks/admin/features/orders/useUpdateOrderStatus";
import StatusItem from "../../shared/StatusItem";
import { ReservationStatus } from "@/types/reservations";
import { STATUS_RENDER } from "@/constants/reservation";

const ReservationStatuses: FC<{
  historyStatus: ReservationStatus[];
  status: ReservationStatus;
  orderId: number;
}> = ({ historyStatus, status, orderId }) => {
  const { mutate, isPending } = useUpdateOrderStatus();

  const handleStatusChange = (newStatus: ReservationStatus) => {
    // mutate({ orderId, status: newStatus });
  };

  const statuses = useMemo((): ComponentProps<typeof StatusItem>[] => {
    const result: ComponentProps<typeof StatusItem>[] = [];

    historyStatus.forEach((status) => {
      result.push({
        active: true,
        icon: STATUS_RENDER[status].icon,
        label: STATUS_RENDER[status].label,
        color:
          status === ReservationStatus.cancelled ||
          status === ReservationStatus.no_show
            ? "error"
            : "primary",
      });
    });

    result.push({
      active: true,
      icon: STATUS_RENDER[status].icon,
      label: STATUS_RENDER[status].label,
      color:
        status === ReservationStatus.cancelled ||
        status === ReservationStatus.no_show
          ? "error"
          : "primary",
    });

    STATUS_RENDER[status].restStatus.forEach((status) => {
      result.push({
        active: false,
        icon: STATUS_RENDER[status].icon,
        label: STATUS_RENDER[status].label,
        color:
          status === ReservationStatus.cancelled ||
          status === ReservationStatus.no_show
            ? "error"
            : "primary",
      });
    });

    return result;
  }, [status, historyStatus]);

  return (
    <div className="card bg-white p-5">
      <p className="card-title">Reservation Status</p>
      <div className="flex justify-between relative mt-4 pb-5">
        {statuses.map((status, idx) => (
          <StatusItem key={idx} first={idx === 0} {...status} />
        ))}
      </div>
      {STATUS_RENDER[status].buttons.length > 0 && (
        <div className="card-actions justify-center pt-4">
          {STATUS_RENDER[status].buttons.map((button) => (
            <Button
              key={button.nextStatus}
              color={button.color}
              disabled={isPending}
              onClick={() => {
                handleStatusChange(button.nextStatus);
              }}
            >
              {button.children}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationStatuses;
