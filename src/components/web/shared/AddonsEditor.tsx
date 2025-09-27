"use client";
import React from "react";
import { QuantityButtons } from "../ui/button";

const AddonsEditor = () => {
  return (
    <div className="">
      <p className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-5">
        Add Extras
      </p>
      <div className="flex flex-col gap-6 items-stretch">
        <AddOnsItem />
        <AddOnsItem />
        <AddOnsItem />
      </div>
    </div>
  );
};

export default AddonsEditor;

function AddOnsItem() {
  return (
    <div className="flex justify-between items-center">
      <QuantityButtons size={"sm"} />
      <div className="flex flex-col gap-1 justify-end">
        <p className="text-web-caption-mobile lg:text-web-caption text-web-content-1">
          Extra Vegetales
        </p>
        <p className="text-web-button-mobile lg:text-web-button text-web-secondary-1">
          + 20.000 VND
        </p>
      </div>
    </div>
  );
}
