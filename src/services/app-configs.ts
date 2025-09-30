import { getDb, DB } from "@/db/drizzle";
import {
  AppConfigDB,
  appConfigs,
  NewAppConfigDB,
  UpdateAppConfigDB,
} from "@/db/schemas";
import { eq } from "drizzle-orm";

// Get single app config by key
export async function getAppConfig<T = any>(key: string): Promise<T | null> {
  const db = getDb();
  const [config] = await db
    .select()
    .from(appConfigs)
    .where(eq(appConfigs.key, key))
    .limit(1);

  return (config?.value as T) || null;
}

// Get app configs by category
export async function getAppConfigsByCategory(
  category: string,
): Promise<AppConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(appConfigs)
    .where(eq(appConfigs.category, category))
    .orderBy(appConfigs.key);
}

// Get all app configs
export async function getAllAppConfigs(): Promise<AppConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(appConfigs)
    .orderBy(appConfigs.category, appConfigs.key);
}

// Set/Update app config
export async function setAppConfig(
  config: NewAppConfigDB,
  tx?: DB,
): Promise<AppConfigDB> {
  const executor = tx ?? getDb();

  const [result] = await executor
    .insert(appConfigs)
    .values({
      name: config.name,
      key: config.key,
      value: config.value,
      category: config.category,
      description: config.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: appConfigs.key,
      set: {
        value: config.value,
        category: config.category,
        description: config.description,
        updatedAt: new Date(),
      },
    })
    .returning();

  return result;
}

// Update existing app config
export async function updateAppConfig(
  key: string,
  data: UpdateAppConfigDB,
  tx?: DB,
): Promise<AppConfigDB | null> {
  const executor = tx ?? getDb();

  const [updated] = await executor
    .update(appConfigs)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(appConfigs.key, key))
    .returning();

  return updated || null;
}

// Bulk set app configs
export async function bulkSetAppConfigs(
  configs: Array<{
    key: string;
    value: any;
    category: string;
    description?: string;
    name: string;
  }>,
  tx?: DB,
): Promise<AppConfigDB[]> {
  const executor = tx ?? getDb();

  const results: AppConfigDB[] = [];

  for (const config of configs) {
    const result = await setAppConfig(config, executor);
    results.push(result);
  }

  return results;
}

// Check if app config exists
export async function appConfigExists(key: string): Promise<boolean> {
  const db = getDb();
  const [config] = await db
    .select({ key: appConfigs.key })
    .from(appConfigs)
    .where(eq(appConfigs.key, key))
    .limit(1);

  return !!config;
}
