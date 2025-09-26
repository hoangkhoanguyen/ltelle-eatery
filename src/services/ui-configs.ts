import { getDb, DB } from "@/db/drizzle";
import { uiConfigs } from "@/db/schemas";
import { eq, and } from "drizzle-orm";

export type NewUIConfigDB = typeof uiConfigs.$inferInsert;
export type UpdateUIConfigDB = Partial<
  Omit<typeof uiConfigs.$inferSelect, "key" | "scope" | "createdAt">
>;
export type UIConfigDB = typeof uiConfigs.$inferSelect;

// Get single UI config by key and scope
export async function getUIConfig<T = any>(
  key: string,
  scope: string = "global",
): Promise<T | null> {
  const db = getDb();
  const [config] = await db
    .select()
    .from(uiConfigs)
    .where(and(eq(uiConfigs.key, key), eq(uiConfigs.scope, scope)))
    .limit(1);

  return (config?.value as T) || null;
}

// Get UI configs by scope
export async function getUIConfigsByScope(
  scope: string,
): Promise<UIConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(uiConfigs)
    .where(eq(uiConfigs.scope, scope))
    .orderBy(uiConfigs.category, uiConfigs.key);
}

// Get UI configs by category
export async function getUIConfigsByCategory(
  category: string,
): Promise<UIConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(uiConfigs)
    .where(eq(uiConfigs.category, category))
    .orderBy(uiConfigs.scope, uiConfigs.key);
}

// Get UI configs by category and scope
export async function getUIConfigsByCategoryAndScope(
  category: string,
  scope: string,
): Promise<UIConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(uiConfigs)
    .where(and(eq(uiConfigs.category, category), eq(uiConfigs.scope, scope)))
    .orderBy(uiConfigs.key);
}

// Get all UI configs
export async function getAllUIConfigs(): Promise<UIConfigDB[]> {
  const db = getDb();
  return await db
    .select()
    .from(uiConfigs)
    .orderBy(uiConfigs.scope, uiConfigs.category, uiConfigs.key);
}

// Set/Update UI config
export async function setUIConfig(
  config: NewUIConfigDB & { key: string; scope: string },
  tx?: DB,
): Promise<UIConfigDB> {
  const executor = tx ?? getDb();

  const [result] = await executor
    .insert(uiConfigs)
    .values(config)
    .onConflictDoUpdate({
      target: [uiConfigs.key, uiConfigs.scope],
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

// Update existing UI config
export async function updateUIConfig(
  key: string,
  scope: string,
  data: UpdateUIConfigDB,
  tx?: DB,
): Promise<UIConfigDB | null> {
  const executor = tx ?? getDb();

  const [updated] = await executor
    .update(uiConfigs)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(uiConfigs.key, key), eq(uiConfigs.scope, scope)))
    .returning();

  return updated || null;
}

// Get UI config with default value
export async function getUIConfigWithDefault<T>(
  key: string,
  scope: string,
  defaultValue: T,
): Promise<T> {
  const value = await getUIConfig<T>(key, scope);
  return value !== null ? value : defaultValue;
}

// Check if UI config exists
export async function uiConfigExists(
  key: string,
  scope: string,
): Promise<boolean> {
  const db = getDb();
  const [config] = await db
    .select({ key: uiConfigs.key })
    .from(uiConfigs)
    .where(and(eq(uiConfigs.key, key), eq(uiConfigs.scope, scope)))
    .limit(1);

  return !!config;
}

// Bulk set UI configs
export async function bulkSetUIConfigs(
  configs: Array<{
    key: string;
    scope: string;
    value: any;
    category: string;
    description?: string;
  }>,
  tx?: DB,
): Promise<UIConfigDB[]> {
  const executor = tx ?? getDb();

  const results: UIConfigDB[] = [];

  for (const config of configs) {
    const result = await setUIConfig(config, executor);
    results.push(result);
  }

  return results;
}

// Update configs by scope
export async function updateUIConfigsByScope(
  scope: string,
  updates: Record<
    string,
    { value: any; category: string; description?: string }
  >,
  tx?: DB,
): Promise<UIConfigDB[]> {
  const executor = tx ?? getDb();

  const results: UIConfigDB[] = [];

  for (const [key, config] of Object.entries(updates)) {
    const result = await setUIConfig(
      {
        key,
        scope,
        value: config.value,
        category: config.category,
        description: config.description,
      },
      executor,
    );
    results.push(result);
  }

  return results;
}

// Get UI config with fallback to global scope
export async function getUIConfigWithFallback<T>(
  key: string,
  scope: string,
  defaultValue?: T,
): Promise<T | null> {
  // Try specific scope first
  let value = await getUIConfig<T>(key, scope);

  // Fallback to global scope if not found and scope is not global
  if (value === null && scope !== "global") {
    value = await getUIConfig<T>(key, "global");
  }

  // Return default value if still not found
  return value !== null ? value : defaultValue ?? null;
}
