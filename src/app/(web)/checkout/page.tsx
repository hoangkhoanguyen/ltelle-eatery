import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutRender from "@/components/web/features/checkout/CheckoutRender";
import { getAppConfigsByKey } from "@/services/configs";
import React from "react";

const page = async () => {
  const orderConfigs = await getAppConfigsByKey("order");

  return (
    <CheckoutProvider shippingRules={orderConfigs?.value.shipping.rules}>
      <CheckoutRender configs={orderConfigs?.value} />
    </CheckoutProvider>
  );
};

export default page;
