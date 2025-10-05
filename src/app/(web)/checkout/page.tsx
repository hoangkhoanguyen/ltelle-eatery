"use client";
import CheckoutForm from "@/components/web/features/checkout/CheckoutForm";
import Note from "@/components/web/features/checkout/Note";
import OrderItem from "@/components/web/features/checkout/OrderItem";
import React from "react";

const page = () => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <CheckoutForm />
        </div>
        <div className="lg:pt-14 lg:pb-10 lg:bg-web-secondary-2 lg:px-5">
          <div className="grid grid-cols-1 gap-5">
            <h2 className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
              Order Summary
            </h2>
            <OrderItem />
            <OrderItem />
            <p className="text-web-h3-mobile lg:text-web-h3 text-web-content-1">
              Where you note the entire order!
            </p>
            <Note />
            <div className="h-1 border-y border-web-content-3"></div>
            <div className="flex flex-col gap-2.5 items-stretch">
              <div className="flex justify-between items-center">
                <span className="text-web-h4-mobile lg:text-web-h4 text-web-content-1">
                  Subtotal
                </span>
                <span className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1">
                  180.000 VND
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-web-h4-mobile lg:text-web-h4 text-web-content-1">
                  Shipping
                </span>
                <span className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1">
                  20.000 VND
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
                Total
              </span>
              <span className="text-web-h2-mobile lg:text-web-h2 text-web-secondary-1">
                240.000 VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
