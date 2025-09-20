import { db, DB } from "@/db/drizzle";
import { orderItemAddons, orderItems } from "@/db/schemas";
import { NewOrderDB, NewOrderItemAddonDB, NewOrderItemDB } from "@/types/order";

async function addOrderItemAddons(data: NewOrderItemAddonDB[], tx?: DB) {
  const executor = tx ?? db;

  return await executor.insert(orderItemAddons).values(data).returning();
}

async function addOrderItems(
  data: (NewOrderItemDB & {
    addons: Omit<NewOrderItemAddonDB, "orderItemId">[];
  })[],
  tx?: DB,
) {
  const executor = tx ?? db;

  await Promise.all(
    data.map(async (item) => {
      const { addons, ...rest } = item;
      const [inserted] = await executor
        .insert(orderItems)
        .values(rest)
        .returning({ insertedId: orderItems.id });

      const orderItemId = inserted.insertedId;
      await addOrderItemAddons(
        addons.map((addon) => ({
          orderItemId,
          ...addon,
        })),
        executor,
      );
    }),
  );
}

export async function addOrder(data: NewOrderDB) {
  // check exist product
}
