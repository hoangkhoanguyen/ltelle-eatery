import { getDb } from "@/db/drizzle";
import { reservations, NewReservationDB } from "@/db/schemas";

export function createReservation(data: NewReservationDB) {
  const db = getDb();
  return db.insert(reservations).values(data).returning();
}

export function getReservationByUuid(uuid: string) {
  const db = getDb();
  return db.query.reservations.findFirst({
    where(fields, operators) {
      return operators.eq(fields.uuid, uuid);
    },
  });
}
