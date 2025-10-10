import CheckoutForm from "@/components/web/features/checkout/CheckoutForm";
import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutSummary from "@/components/web/features/checkout/CheckoutSummary";
import { getAppConfigsByKey } from "@/services/configs";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  const order = await getAppConfigsByKey("order");

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
