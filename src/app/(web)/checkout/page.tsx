import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutRender from "@/components/web/features/checkout/CheckoutRender";
import { getAppConfigsByKeyCached } from "@/services/cached";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout | LTelle Eatery",
  description: "Complete your order at LTelle Eatery. Secure checkout process.",
};

const page = async () => {
  const orderConfigs = await getAppConfigsByKeyCached("order");

  return (
    <CheckoutProvider
      shippingMethods={orderConfigs?.value.shipping.methods}
      defaultMethod={
        ((orderConfigs?.value.shipping.methods as any[]) || []).find(
          (item: any) => item.isDefault,
        )?.method
      }
      shippingRules={orderConfigs?.value.shipping.rules}
    >
      <CheckoutRender configs={orderConfigs?.value} />
    </CheckoutProvider>
  );
};

export default page;
