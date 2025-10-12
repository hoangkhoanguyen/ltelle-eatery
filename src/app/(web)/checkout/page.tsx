import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutRender from "@/components/web/features/checkout/CheckoutRender";
import { getAppConfigsByKeyCached } from "@/services/configs";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  const orderConfigs = await getAppConfigsByKeyCached("order");

  return (
    <CheckoutProvider shippingRules={orderConfigs?.value.shipping.rules}>
      <CheckoutRender configs={orderConfigs?.value} />
    </CheckoutProvider>
  );
};

export default page;
