import { getDb } from "@/db/drizzle";
import { NewAppConfigDB, appConfigs } from "@/db/schemas";
import { Config } from "@/types/configs";
import { eq } from "drizzle-orm";

export async function getAppConfigByKey(key: string) {
  const db = getDb();

  const config = await db.query.appConfigs.findFirst({
    where(fields, { eq }) {
      return eq(fields.key, key);
    },
  });

  return config;
}

export async function initAppConfig(data: NewAppConfigDB) {
  const db = getDb();

  const existingConfig = await getAppConfigByKey(data.key);
  if (existingConfig) {
    throw new Error("App Config already exists");
  }

  await db.insert(appConfigs).values(data);
}

export async function updateAppConfigByKey({
  value,
  key,
}: {
  key: string;
  value: Config;
}) {
  const db = getDb();

  const existingConfig = await getAppConfigByKey(key);

  if (!existingConfig) {
    throw new Error("App Config not found");
  }

  await db
    .update(appConfigs)
    .set({ value, updatedAt: new Date() })
    .where(eq(appConfigs.key, key));
}
