"use server";
import { ReservationStatus } from "@/db/schemas";
import {
  updateReservationInternalNote,
  updateReservationStatus,
} from "@/services/reservations";

export async function updateReservationStatusAction({
  reservationId,
  status,
}: {
  reservationId: number;
  status: ReservationStatus;
}) {
  try {
    const updatedReservation = await updateReservationStatus(
      reservationId,
      status,
    );

    return {
      success: true,
      data: { updatedReservation },
    };
  } catch (error) {
    console.log("Error updating reservation status:", error);
    return {
      success: false,
    };
  }
}
export async function updateReservationInternalNoteAction({
  reservationId,
  internalNote,
}: {
  reservationId: number;
  internalNote: string;
}) {
  try {
    const updatedReservation = await updateReservationInternalNote(
      reservationId,
      internalNote,
    );

    return {
      success: true,
      data: { updatedReservation },
    };
  } catch (error) {
    console.log("Error updating reservation internal note:", error);
    return {
      success: false,
    };
  }
}
