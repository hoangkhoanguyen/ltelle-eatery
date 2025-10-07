import { AdminReservationTable } from "@/types/reservations";
import React, { FC } from "react";

const ReservationNote: FC<{ data: Pick<AdminReservationTable, "note"> }> = ({
  data,
}) => {
  return (
    <div className="card p-5 bg-orange-100">
      <h2 className="card-title text-orange-500">Reservation Note</h2>
      <p className="mt-2 text-sm text-orange-700">{data.note || "--/--"}</p>
    </div>
  );
};

export default ReservationNote;
