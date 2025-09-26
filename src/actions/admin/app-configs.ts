"use server";
import { NewAppConfigDB } from "@/db/schemas";
import {
  setAppConfig,
  updateAppConfig,
  appConfigExists,
} from "@/services/app-configs";

// Initialize a new app config
export async function initAppConfig(data: NewAppConfigDB) {
  try {
    const newConfig = await setAppConfig(data);

    return {
      success: true,
      data: newConfig,
    };
  } catch {
    return {
      success: false,
      error: "Failed to initialize configuration",
    };
  }
}

// Update existing app config
export async function updateAppConfigAction({
  key,
  value,
}: {
  key: string;
  value: any;
}) {
  try {
    // Check if config exists
    const exists = await appConfigExists(key);

    if (!exists) {
      return {
        success: false,
        code: 1,
        error: `Configuration with key "${key}" not found`,
      };
    }

    const updatedConfig = await updateAppConfig(key, {
      value,
      updatedAt: new Date(),
    });

    return {
      success: true,
      data: updatedConfig,
    };
  } catch {
    return {
      success: false,
      error: "Failed to update configuration",
    };
  }
}
