"use client";
import Icon from "@/components/common/Icon";
import React, { FC } from "react";
import { Button } from "../../ui/button";
import { cn, splitTextByNewLine } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReservationSchema } from "@/validations/reservation";
import { useMutation } from "@tanstack/react-query";
import { createReservationAction } from "@/actions/web/reservations";
import { toast } from "sonner";
import { useReservationContext } from "./ReservationProvider";
import { useSetLoading } from "@/hooks/web/ui/loading";

const ReservationForm: FC<{
  configs: any;
}> = ({ configs }) => {
  const { setNewReservation } = useReservationContext();
  const { handleSubmit, control } = useForm({
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

  useSetLoading(isPending);

  return (
    <div className="reservation-card-shadow bg-white rounded-xl p-5 @container">
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-5">
        <div className="col-span-1 @md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-11 aspect-square rounded-full bg-web-secondary-1">
              <Icon
                icon={"ph:calendar-blank"}
                className="text-web-content-1 text-2xl"
              />
            </div>
            <h3 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1">
              Make a Reservation
            </h3>
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2">
            Please fill out all required fields to secure your dining experience
          </p>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div className="flex items-center gap-2">
            <Icon
              icon="ph:calendar-blank"
              className="text-2xl text-web-secondary-1"
            />
            <h4 className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
              Reservation Details
            </h4>
          </div>
        </div>

        <div className="col-span-1">
          <div>
            <label className="web-reservation-label">
              Preferred Date Time *
            </label>
            <Controller
              control={control}
              name="arrivalTime"
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    className={cn("web-input", !!error && " web-input-error")}
                    {...field}
                  />
                  {error?.message && (
                    <p className="text-web-error text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="col-span-1">
          <div>
            <label className="web-reservation-label">Number of Guests *</label>
            <Controller
              control={control}
              name="numberOfPeople"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <input
                    type="number"
                    className={cn("web-input", !!error && " web-input-error")}
                    placeholder="Enter number of guests"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                  />
                  {error?.message && (
                    <p className="text-web-error text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2"></div>

        <div className="col-span-1 @md:col-span-2">
          <div className="flex items-center gap-2">
            <Icon icon="ph:phone" className="text-2xl text-web-secondary-1" />
            <h4 className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
              Contact Details
            </h4>
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div>
            <label className="web-reservation-label">Full Name *</label>
            <Controller
              control={control}
              name="customerFullName"
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    className={cn("web-input", !!error && " web-input-error")}
                    placeholder="Enter your full name"
                    {...field}
                  />
                  {error?.message && (
                    <p className="text-web-error text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div>
            <label className="web-reservation-label">
              Phone Number at Vietnam *
            </label>
            <Controller
              control={control}
              name="customerPhone"
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="tel"
                    className={cn("web-input", !!error && " web-input-error")}
                    placeholder="Enter your phone number"
                    {...field}
                  />
                  {error?.message && (
                    <p className="text-web-error text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2"></div>

        <div className="col-span-1 @md:col-span-2">
          <div className="flex items-center gap-2">
            <Icon
              icon="ph:chat-circle"
              className="text-2xl text-web-secondary-1"
            />
            <h4 className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
              Special Request
            </h4>
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div>
            <label className="web-reservation-label">
              Additional Information (Optional)
            </label>
            <Controller
              control={control}
              name="note"
              render={({ field, fieldState: { error } }) => (
                <>
                  <textarea
                    rows={4}
                    className={cn(
                      "web-input bg-web-background-2",
                      !!error && " web-input-error",
                    )}
                    placeholder="Tell us about dietary restrictions, celebrations, seating preferences, or any other special requirements..."
                    {...field}
                  ></textarea>
                  {error?.message && (
                    <p className="text-web-error text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2 h-[1px] bg-web-content-3"></div>
        <div className="col-span-1 @md:col-span-2">
          <Button
            className="w-full rounded-lg py-4 text-web-button-mobile lg:text-web-button"
            variant={"primary"}
            type="button"
            onClick={handleSubmit((data) => {
              mutate(data);
            })}
          >
            Submit Reservation Request
          </Button>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div className="p-2.5 bg-web-secondary-2 rounded-lg">
            {splitTextByNewLine(configs.note).map((line, index) => (
              <p
                key={index}
                className="text-web-content-2 text-web-body-mobile lg:text-web-body text-center"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
