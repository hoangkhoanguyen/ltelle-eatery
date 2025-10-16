"use client";
import React, { FC } from "react";
import ReservationSubmitSuccess from "./ReservationSubmitSuccess";
import DefaultBookingSection from "./DefaultBookingSection";
import { useReservationContext } from "./ReservationProvider";

const Content: FC<{
  configs?: any;
}> = ({ configs }) => {
  const { newReservation } = useReservationContext();

  if (newReservation) {
    return (
      <ReservationSubmitSuccess
        configs={configs}
        reservation={newReservation}
      />
    );
  }

  return <DefaultBookingSection configs={configs} />;
};

export default Content;
