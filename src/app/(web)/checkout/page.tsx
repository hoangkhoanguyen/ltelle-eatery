import CheckoutForm from "@/components/web/features/checkout/CheckoutForm";
import CheckoutItems from "@/components/web/features/checkout/CheckoutItems";
import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutSummary from "@/components/web/features/checkout/CheckoutSummary";
import Note from "@/components/web/features/checkout/Note";
import { getAppConfigsByKey } from "@/services/configs";
import React from "react";

const page = async () => {
  const order = await getAppConfigsByKey("order");
  console.log(order);
  return (
    <CheckoutProvider shippingRules={order?.value.shipping.rules}>
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <CheckoutForm shippingMethods={order?.value.shipping.methods} />
          </div>
          <div className="lg:pt-14 lg:pb-10 lg:bg-web-secondary-2 lg:px-5">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default page;
