import OrderInformation from "@/components/admin/features/orders/OrderInformation";
import DeliveryInformation from "@/components/admin/features/orders/DeliveryInformation";
import OrderStatuss from "@/components/admin/features/orders/OrderStatuses";
import Header from "@/components/admin/shared/header/Header";
import { getAdminOrderById } from "@/services/orders";
import React from "react";
import OrderSummary from "@/components/admin/features/orders/OrderSummary";
import InternalNote from "@/components/admin/features/orders/InternalNote";
import OrderItems from "@/components/admin/features/orders/OrderItems";
import { AdminOrderAddon, OrderStatus, OrderType } from "@/types/orders";

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const order = await getAdminOrderById(Number(id));
  console.log("order", order);

  if (!order) {
    return <div>Order not found</div>;
  }

  const historyStatus = order.statusHistory.map(
    (item) => item.previousStatus as OrderStatus,
  );

  return (
    <div>
      <Header title="Order Details" />
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_320px] gap-5">
          <div className="col-span-1">
            <div className="grid gap-5">
              <OrderStatuss
                historyStatus={historyStatus}
                status={order.status as OrderStatus}
                orderId={order.id}
              />
              <OrderInformation
                data={{
                  customerName: order.firstName + " " + order.lastName,
                  customerPhone: order.customerPhone,
                  code: order.code,
                  orderType: order.orderType as OrderType,
                  note: order.note,
                }}
              />
              {order.orderType === OrderType.delivery && (
                <DeliveryInformation
                  data={{
                    deliveryAddress: order.deliveryAddress,
                    addressNote: order.addressNote,
                  }}
                />
              )}
              <OrderItems
                items={order.items.map((item) => ({
                  id: item.id,
                  productName: item.productName,
                  quantity: item.quantity,
                  price: item.price,
                  totalPrice: item.totalPrice,
                  note: item.note,
                  image: item.product.images[0]?.url || null,
                  productId: item.productId,
                  addons: item.addons.map(
                    (addon): AdminOrderAddon => ({
                      id: addon.id,
                      addonId: addon.addonId,
                      name: addon.addonName,
                      quantity: addon.quantity,
                      price: addon.price,
                      totalPrice: addon.totalPrice,
                    }),
                  ),
                }))}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
              <OrderSummary
                data={{
                  totalPrice: order.totalPrice,
                  shippingFee: order.shippingFee,
                  paymentMethod: order.paymentMethod,
                  createdAt: order.createdAt,
                }}
              />
              <InternalNote
                data={{
                  internalNote: order.internalNote,
                  id: order.id,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
