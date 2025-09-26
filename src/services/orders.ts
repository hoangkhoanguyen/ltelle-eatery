import { getDb } from "@/db/drizzle";
import {
  orders,
  orderItems,
  orderItemAddons,
  customers,
  orderStatusHistory,
} from "@/db/schemas";
import {
  OrderDB,
  NewOrderDB,
  OrderItemDB,
  NewOrderItemDB,
  OrderItemAddonDB,
  NewOrderItemAddonDB,
} from "@/types/orders";
import {
  count,
  desc,
  eq,
  or,
  ilike,
  gte,
  lte,
  inArray,
  and,
} from "drizzle-orm";

export type CreateOrderRequest = {
  orderData: Omit<NewOrderDB, "code">;
  orderItems: (Omit<NewOrderItemDB, "id" | "orderId"> & {
    addons?: Omit<NewOrderItemAddonDB, "id" | "orderItemId">[];
  })[];
};

export type CreateOrderResponse = {
  order: OrderDB;
  items: (OrderItemDB & { addons: OrderItemAddonDB[] })[];
};

export async function createOrder(
  request: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const db = getDb();

  return await db.transaction(async (tx) => {
    const { orderData, orderItems: itemsData } = request;

    const [customer] = await tx
      .select()
      .from(customers)
      .where(eq(customers.phone, orderData.customerPhone))
      .limit(1);

    if (!customer) {
      await tx
        .insert(customers)
        .values({
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          phone: orderData.customerPhone,
        })
        .returning();
    } else if (
      customer.firstName !== orderData.firstName ||
      customer.lastName !== orderData.lastName ||
      customer.lastUsedAddress !== orderData.deliveryAddress ||
      customer.lastUsedOrderType !== orderData.orderType
    ) {
      await tx
        .update(customers)
        .set({
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          lastUsedAddress: orderData.deliveryAddress,
          lastUsedOrderType: orderData.orderType,
          updatedAt: new Date(),
        })
        .where(eq(customers.id, customer.id))
        .returning();
    }

    // Generate a unique order code
    const orderCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // 1. Create the order
    const [order] = await tx
      .insert(orders)
      .values({
        ...orderData,
        code: orderCode,
        status: "pending", // default status
      })
      .returning();

    const createdItems: (OrderItemDB & { addons: OrderItemAddonDB[] })[] = [];

    // 2. Create order items and their addons
    for (const itemData of itemsData) {
      const { addons, ...orderItemData } = itemData;

      // Create order item
      const [createdItem] = await tx
        .insert(orderItems)
        .values({
          ...orderItemData,
          orderId: order.id,
        })
        .returning();

      let createdAddons: OrderItemAddonDB[] = [];

      // Create addons for this item if they exist
      if (addons?.length) {
        const addonData = addons.map((addon) => ({
          ...addon,
          orderItemId: createdItem.id,
        }));

        createdAddons = await tx
          .insert(orderItemAddons)
          .values(addonData)
          .returning();
      }
      createdItems.push({ ...createdItem, addons: createdAddons });
    }

    return {
      order,
      items: createdItems,
    };
  });
}

export async function getAdminOrderTable({
  limit = 20,
  page = 1,
  search,
  end_date,
  start_date,
  status,
  order_type,
}: {
  limit?: number;
  page?: number;
  search: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string[];
  order_type: string[];
}) {
  try {
    const db = getDb();
    const offset = limit * (page - 1);

    // Extract the where conditions into a reusable function
    const buildWhereConditions = (fields: any, operators: any) => {
      const conditions = [];
      const { or, ilike, gte, lte, inArray, and } = operators;

      if (search) {
        conditions.push(
          or(
            ilike(fields.code, `%${search}%`),
            ilike(fields.firstName, `%${search}%`),
            ilike(fields.lastName, `%${search}%`),
            ilike(fields.customerPhone, `%${search}%`),
          ),
        );
      }

      if (start_date) {
        const startDate = new Date(start_date);
        startDate.setHours(0, 0, 0, 0);
        conditions.push(gte(fields.createdAt, startDate));
      }

      if (end_date) {
        const endDate = new Date(end_date);
        endDate.setHours(23, 59, 59, 999);
        conditions.push(lte(fields.createdAt, endDate));
      }

      if (status.length) {
        conditions.push(inArray(fields.status, status as any));
      }

      if (order_type.length) {
        conditions.push(inArray(fields.orderType, order_type as any));
      }

      return and(...conditions);
    };

    const [ordersList, [{ count: totalCount }]] = await Promise.all([
      db.query.orders.findMany({
        where: buildWhereConditions,
        limit,
        offset,
        orderBy: [desc(orders.createdAt)],
      }),
      db
        .select({ count: count(orders.id) })
        .from(orders)
        .where(
          buildWhereConditions(orders, { or, ilike, gte, lte, inArray, and }),
        ),
    ]);

    return {
      orders: ordersList,
      total: totalCount,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching admin order table:", error);
    throw new Error("Failed to fetch admin order table");
  }
}

export async function getAdminOrderById(id: number) {
  const db = getDb();
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      items: {
        with: {
          addons: true,
          product: {
            with: {
              images: {
                orderBy(fields, { asc }) {
                  return [asc(fields.sortOrder)];
                },
                limit: 1,
              },
            },
          },
        },
      },
      statusHistory: { orderBy: [orders.createdAt] },
    },
  });

  return order;
}

export async function updateOrderStatus(
  orderId: number,
  newStatus: "processing" | "completed" | "cancelled",
) {
  const db = getDb();

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === newStatus) {
    throw new Error("Order is already in the desired status");
  }

  return await db.transaction(async (tx) => {
    // 1. Update the order status
    const [updatedOrder] = await tx
      .update(orders)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(orders.id, orderId))
      .returning();

    // 2. Insert a new record into the status history
    await tx.insert(orderStatusHistory).values({
      orderId,
      newStatus,
      previousStatus: order.status,
      createdAt: new Date(),
    });

    return updatedOrder;
  });
}

export async function updateOrderInternalNote(
  orderId: number,
  internalNote: string,
) {
  const db = getDb();

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order || order.status === "cancelled" || order.status === "completed") {
    throw new Error("Cannot update note for this order");
  }

  const [updatedOrder] = await db
    .update(orders)
    .set({ internalNote, updatedAt: new Date() })
    .where(eq(orders.id, orderId))
    .returning();

  return updatedOrder;
}
