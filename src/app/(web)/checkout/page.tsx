import CheckoutProvider from "@/components/web/features/checkout/CheckoutProvider";
import CheckoutRender from "@/components/web/features/checkout/CheckoutRender";
import { getAppConfigsByKey } from "@/services/configs";
import React from "react";

const page = async () => {
  const orderConfigs = await getAppConfigsByKey("order");

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
