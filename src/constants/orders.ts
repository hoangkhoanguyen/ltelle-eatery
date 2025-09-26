import { OrderStatus, OrderType, PaymentMethod } from "@/types/orders";

export const ORDER_STATUS: Record<
  OrderStatus,
  {
    color: string;
    label: string;
  }
> = {
  [OrderStatus.pending]: {
    color: "badge-warning",
    label: "Pending",
  },
  [OrderStatus.processing]: {
    color: "badge-info",
    label: "Processing",
  },
  [OrderStatus.completed]: {
    color: "badge-success",
    label: "Completed",
  },
  [OrderStatus.cancelled]: {
    color: "badge-error",
    label: "Cancelled",
  },
};

export const ORDER_TYPE: Record<
  OrderType,
  {
    color: string;
    label: string;
  }
> = {
  [OrderType.pickup]: {
    color: "badge-secondary",
    label: "Pickup at Restaurant",
  },
  [OrderType.delivery]: {
    color: "badge-success",
    label: "Door-to-Door Delivery",
  },
};

export const ORDER_PAYMENT_METHOD: Record<PaymentMethod, { label: string }> = {
  [PaymentMethod.cash_on_delivery]: {
    label: "Cash on Delivery",
  },
};
