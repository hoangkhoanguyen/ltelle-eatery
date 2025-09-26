"use client";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/orders";
import React, { ComponentProps, FC, useMemo } from "react";
import { Button } from "../../ui/button";
import useUpdateOrderStatus from "@/hooks/admin/features/orders/useUpdateOrderStatus";

const STATUS_RENDER: Record<
  OrderStatus,
  {
    label: string;
    icon: string;
    restStatus: OrderStatus[];
    buttons: (ComponentProps<typeof Button> & {
      action: "confirm" | "complete" | "cancel";
    })[];
  }
> = {
  [OrderStatus.pending]: {
    label: "Pending",
    icon: "streamline-pixel:interface-essential-waiting-hourglass-loading",
    restStatus: [OrderStatus.processing, OrderStatus.completed],
    buttons: [
      {
        color: "primary",
        children: "Confirm",
        action: "confirm",
      },
      {
        color: "error",
        children: "Cancel",
        action: "cancel",
      },
    ],
  },
  [OrderStatus.processing]: {
    label: "In Progress",
    icon: "icon-park-outline:loading-one",
    restStatus: [OrderStatus.completed],
    buttons: [
      {
        color: "primary",
        children: "Complete",
        action: "complete",
      },
      {
        color: "error",
        children: "Cancel",
        action: "cancel",
      },
    ],
  },
  [OrderStatus.completed]: {
    label: "Completed",
    icon: "iconamoon:check-bold",
    restStatus: [],
    buttons: [],
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    icon: "iconoir:cancel",
    restStatus: [],
    buttons: [],
  },
};

const OrderStatuses: FC<{
  historyStatus: OrderStatus[];
  status: OrderStatus;
  orderId: number;
}> = ({ historyStatus, status, orderId }) => {
  const { mutate, isPending } = useUpdateOrderStatus();

  const handleStatusChange = (action: "confirm" | "complete" | "cancel") => {
    let newStatus: OrderStatus;
    switch (action) {
      case "confirm":
        newStatus = OrderStatus.processing;
        break;
      case "complete":
        newStatus = OrderStatus.completed;
        break;
      case "cancel":
        newStatus = OrderStatus.cancelled;
        break;
      default:
        return;
    }
    mutate({ orderId, status: newStatus });
  };

  const statuses = useMemo((): ComponentProps<typeof StatusItem>[] => {
    const result: ComponentProps<typeof StatusItem>[] = [];

    historyStatus.forEach((status) => {
      result.push({
        active: true,
        icon: STATUS_RENDER[status].icon,
        label: STATUS_RENDER[status].label,
        color: status === OrderStatus.cancelled ? "error" : "primary",
      });
    });

    result.push({
      active: true,
      icon: STATUS_RENDER[status].icon,
      label: STATUS_RENDER[status].label,
      color: status === OrderStatus.cancelled ? "error" : "primary",
    });

    STATUS_RENDER[status].restStatus.forEach((status) => {
      result.push({
        active: false,
        icon: STATUS_RENDER[status].icon,
        label: STATUS_RENDER[status].label,
        color: status === OrderStatus.cancelled ? "error" : "primary",
      });
    });

    return result;
  }, [status, historyStatus]);

  return (
    <div className="card bg-white card-body">
      <p className="card-title">Order Status</p>
      <div className="flex justify-between relative mt-4 pb-5">
        {statuses.map((status, idx) => (
          <StatusItem key={idx} first={idx === 0} {...status} />
        ))}
      </div>
      {STATUS_RENDER[status].buttons.length > 0 && (
        <div className="card-actions justify-center pt-4">
          {STATUS_RENDER[status].buttons.map((button) => (
            <Button
              key={button.action}
              color={button.color}
              disabled={isPending}
              onClick={() => {
                handleStatusChange(button.action);
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

export default OrderStatuses;

function StatusItem({
  first,
  active,
  icon,
  label,
  color = "primary",
}: {
  first?: boolean;
  active?: boolean;
  icon: string;
  label: string;
  color?: "primary" | "error";
}) {
  return (
    <div className={cn("flex justify-end relative", first ? "" : "flex-1")}>
      {!first && (
        <span
          className={cn(
            "absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 z-0",
            active
              ? color === "primary"
                ? "bg-primary"
                : "bg-error"
              : "bg-gray-300",
          )}
        ></span>
      )}
      <div
        className={cn(
          "relative w-12 aspect-square rounded-full flex items-center justify-center",
          active
            ? color === "primary"
              ? "bg-primary"
              : "bg-error"
            : "bg-gray-300",
        )}
      >
        <Icon icon={icon} className="text-white text-lg" />
        <span
          className={cn(
            "absolute -bottom-6 text-center w-max text-xs font-medium",
            active
              ? color === "primary"
                ? "text-primary"
                : "text-error"
              : "text-gray-400",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
