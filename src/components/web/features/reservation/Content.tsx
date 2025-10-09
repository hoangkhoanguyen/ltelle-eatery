"use client";
import React, { FC, useState } from "react";
import ReservationForm from "./ReservationForm";
import ReservationSubmitSuccess from "./ReservationSubmitSuccess";
import { ReservationDB } from "@/db/schemas";
import DefaultBookingSection from "./DefaultBookingSection";

const Content: FC<{
  configs?: any;
  // children?: React.ReactNode;
}> = ({ configs }) => {
  const [newReservation, setNewReservation] = useState<ReservationDB | null>(
    null,
  );

  if (newReservation) {
    return (
      <ReservationSubmitSuccess
        configs={configs}
        reservation={newReservation}
      />
    );
  }

  return (
    <DefaultBookingSection configs={configs} onSuccess={setNewReservation} />
  );
};

export default Content;
