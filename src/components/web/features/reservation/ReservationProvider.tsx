"use client";
import { ReservationDB } from "@/db/schemas";
import React, { createContext, FC, PropsWithChildren, useContext } from "react";

const Context = createContext<{
  newReservation: ReservationDB | null;
  setNewReservation: React.Dispatch<React.SetStateAction<ReservationDB | null>>;
} | null>(null);

const ReservationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [newReservation, setNewReservation] =
    React.useState<ReservationDB | null>(null);
  return (
    <Context.Provider value={{ newReservation, setNewReservation }}>
      {children}
    </Context.Provider>
  );
};

export default ReservationProvider;

export const useReservationContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useReservation must be wrapped in ReservationProvider");

  return context;
};
