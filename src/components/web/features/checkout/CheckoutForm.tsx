"use client";
import React from "react";
import { RadioItem } from "../../ui/form";

const CheckoutForm = () => {
  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
          Contact
        </h2>
        <input
          type="tel"
          className="web-input"
          placeholder="Phone number in Vietnam"
        />
        <input type="text" className="web-input" placeholder="First name" />
        <input type="text" className="web-input" placeholder="Last name" />
        <h2 className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
          Payment Method
        </h2>
        <RadioItem checked={true} onChange={() => {}} label="Only Cash" />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
          Shipping Method
        </h2>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2">
              We will free shipping for orders over 500,000 VND and within a
              radius of 5km, greater than 5km we will support you 30,000 VND. If
              the order is under 500,000 VND we will charge 30,000 VND for
              shipping fee.
            </p>
            <RadioItem
              checked={true}
              onChange={() => {}}
              label="Door-to-door Delivery"
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2">
              When you select this option, restaurant staff will contact you to
              ask for your pick-up time.
            </p>
            <RadioItem
              checked={true}
              onChange={() => {}}
              label="Pick up restaurant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
