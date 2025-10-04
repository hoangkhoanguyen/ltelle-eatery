"use server";
import { NewAppConfigDB } from "@/db/schemas";
import { initAppConfig, updateAppConfigByKey } from "@/services/app-configs";
import { Config } from "@/types/configs";

export async function initAppConfigsAction(data: NewAppConfigDB) {
  try {
    await initAppConfig(data);

    return {
      success: true,
      message: "App Config initialized successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to initialize App Config",
    };
  }
}

export async function updateAppConfigsAction({
  key,
  value,
}: {
  key: string;
  value: Config;
}) {
  try {
    await updateAppConfigByKey({ key, value });

    return {
      success: true,
      message: "App Config updated successfully",
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: "Failed to update App Config",
    };
  }
}
