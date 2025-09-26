import { Button } from "@/components/admin/ui/button";
import { ReservationStatus } from "@/types/reservations";
import { ComponentProps } from "react";

export const STATUS_RENDER: Record<
  ReservationStatus,
  {
    label: string;
    icon: string;
    restStatus: ReservationStatus[];
    buttons: (ComponentProps<typeof Button> & {
      nextStatus: ReservationStatus;
    })[];
  }
> = {
  [ReservationStatus.scheduled]: {
    label: "Scheduled",
    icon: "streamline-pixel:interface-essential-waiting-hourglass-loading",
    restStatus: [
      ReservationStatus.confirmed,
      ReservationStatus.seated,
      ReservationStatus.completed,
    ],
    buttons: [
      {
        color: "primary",
        children: "Confirm",
        nextStatus: ReservationStatus.confirmed,
      },
      {
        color: "error",
        children: "Cancel",
        nextStatus: ReservationStatus.cancelled,
      },
    ],
  },
  [ReservationStatus.confirmed]: {
    label: "Confirmed",
    icon: "icon-park-outline:loading-one",
    restStatus: [ReservationStatus.seated, ReservationStatus.completed],
    buttons: [
      {
        color: "primary",
        children: "Check In",
        nextStatus: ReservationStatus.seated,
      },
      {
        color: "error",
        children: "No Show",
        nextStatus: ReservationStatus.no_show,
      },
      {
        color: "error",
        children: "Cancel",
        nextStatus: ReservationStatus.cancelled,
      },
    ],
  },
  [ReservationStatus.seated]: {
    label: "Seated",
    icon: "iconamoon:check-bold",
    restStatus: [ReservationStatus.completed],
    buttons: [
      {
        color: "primary",
        children: "Complete",
        nextStatus: ReservationStatus.completed,
      },
    ],
  },
  [ReservationStatus.completed]: {
    label: "Completed",
    icon: "iconamoon:check-bold",
    restStatus: [],
    buttons: [],
  },
  [ReservationStatus.cancelled]: {
    label: "Cancelled",
    icon: "iconoir:cancel",
    restStatus: [],
    buttons: [],
  },
  [ReservationStatus.no_show]: {
    label: "No Show",
    icon: "iconoir:cancel",
    restStatus: [],
    buttons: [],
  },
};
