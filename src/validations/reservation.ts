import z from "zod";

export const createReservationSchema = z.object({
  arrivalTime: z
    .string({
      error: "Please provide a valid date and time",
    })
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      {
        message: "Arrival time must be now or in the future",
      },
    ),
  numberOfPeople: z
    .number({
      error: "Number of guests is required",
    })
    .min(1, { message: "Number of guests must be at least 1" })
    .max(20, { message: "Number of guests must be at most 20" }),
  customerFullName: z
    .string({
      error: "Full name is required",
    })
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(255, { message: "Full name must be at most 255 characters long" }),
  customerPhone: z
    .string({
      error: "Phone number is required",
    })
    .min(7, { message: "Phone number must be at least 7 characters long" })
    .max(20, { message: "Phone number must be at most 20 characters long" }),
  note: z
    .string()
    .max(1000, { message: "Note must be at most 1000 characters long" })
    .optional()
    .or(z.literal("")),
});

export type CreateReservationType = z.infer<typeof createReservationSchema>;
