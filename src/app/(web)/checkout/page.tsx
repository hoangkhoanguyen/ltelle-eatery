import CustomerContact from "@/components/web/features/checkout/CustomerContact";
import React from "react";

const page = () => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lggrid-cols-2 gap-5">
        <div className="flex flex-col gap-10 items-stretch">
          <CustomerContact />
        </div>
      </div>
    </div>
  );
};

export default page;
