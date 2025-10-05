import Icon from "@/components/common/Icon";
import React, { FC } from "react";
import { Button } from "../../ui/button";
import { splitTextByNewLine } from "@/lib/utils";

const ReservationForm: FC<{ configs: any }> = ({ configs }) => {
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
            <input type="datetime-local" className="web-input" />
          </div>
        </div>

        <div className="col-span-1">
          <div>
            <label className="web-reservation-label">Number of Guests *</label>
            <input
              type="number"
              className="web-input"
              placeholder="Enter number of guests"
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2"></div>

        <div className="col-span-1 @md:col-span-2">
          <div className="flex items-center gap-2">
            <Icon icon="ph:phone" className="text-2xl text-web-secondary-1" />
            <h4 className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
              Customer Details
            </h4>
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div>
            <label className="web-reservation-label">Full Name *</label>
            <input
              type="text"
              className="web-input"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2">
          <div>
            <label className="web-reservation-label">
              Phone Number at Vietnam *
            </label>
            <input
              type="tel"
              className="web-input"
              placeholder="Enter your phone number"
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
            <textarea
              rows={4}
              className="web-input bg-web-background-2"
              placeholder="Tell us about dietary restrictions, celebrations, seating preferences, or any other special requirements..."
            ></textarea>
          </div>
        </div>

        <div className="col-span-1 @md:col-span-2 h-[1px] bg-web-content-3"></div>
        <div className="col-span-1 @md:col-span-2">
          <Button
            className="w-full rounded-lg py-4 text-web-button-mobile lg:text-web-button"
            variant={"primary"}
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
