"use client";
import { createReservationAction } from "@/actions/web/reservations";
import { ReservationDB } from "@/db/schemas";
import { useSetLoading } from "@/hooks/web/ui/loading";
import {
  createReservationSchema,
  CreateReservationType,
} from "@/validations/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { Control, useForm } from "react-hook-form";
import { toast } from "sonner";

const Context = createContext<{
  newReservation: ReservationDB | null;
  control: Control<CreateReservationType>;
  onSubmit(): void;
} | null>(null);

const ReservationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [newReservation, setNewReservation] =
    React.useState<ReservationDB | null>(null);
  const { handleSubmit, control } = useForm<CreateReservationType>({
    defaultValues: {
      customerFullName: "",
      customerPhone: "",
      numberOfPeople: 1,
      arrivalTime: "",
      note: "",
    },
    resolver: zodResolver(createReservationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createReservationAction,
    onSuccess(data) {
      if (data.success) {
        toast.success(
          `Reservation successful! Your code is ${data.reservation!.code}`,
        );
        setNewReservation(data.reservation!);
      } else {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = handleSubmit((data: CreateReservationType) => {
    mutate(data);
  });

  useSetLoading(isPending);

  return (
    <Context.Provider value={{ newReservation, onSubmit, control }}>
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
