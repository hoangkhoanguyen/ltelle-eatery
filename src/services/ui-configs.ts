import { getDb } from "@/db/drizzle";
import { NewUIConfigDB, uiConfigs } from "@/db/schemas";
import { Config } from "@/types/configs";
import { and, eq } from "drizzle-orm";

export async function getUIConfigsByKey(key: string) {
  const db = getDb();

  const config = await db.query.uiConfigs.findFirst({
    where(fields, { and, eq }) {
      return and(eq(fields.key, key), eq(fields.scope, "website"));
    },
  });

  return config;
}

export async function initUIConfig(data: NewUIConfigDB) {
  const db = getDb();

  const existingConfig = await getUIConfigsByKey(data.key);
  if (existingConfig) {
    throw new Error("UI Config already exists");
  }

  await db.insert(uiConfigs).values(data);
}

export async function updateUIConfigByKey({
  value,
  key,
}: {
  key: string;
  value: Config;
}) {
  const db = getDb();

  const existingConfig = await getUIConfigsByKey(key);

  if (!existingConfig) {
    throw new Error("UI Config not found");
  }

  await db
    .update(uiConfigs)
    .set({ value, updatedAt: new Date() })
    .where(and(eq(uiConfigs.key, key), eq(uiConfigs.scope, "website")));
}
