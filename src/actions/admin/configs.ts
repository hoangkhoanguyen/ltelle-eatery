"use server";
import { ConfigDB, NewConfigDB } from "@/db/schemas";
import { initConfig, updateConfigByKey } from "@/services/configs";

export async function initConfigsAction(data: NewConfigDB) {
  try {
    await initConfig(data);

    return {
      success: true,
      message: "Configs initialized successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to initialize Configs",
    };
  }
}

export async function updateConfigsAction({
  key,
  value,
  config_type,
}: {
  key: string;
  value: ConfigDB["value"];
  config_type: string;
}) {
  try {
    await updateConfigByKey({ key, config_type, value });

    return {
      success: true,
      message: "Configs updated successfully",
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: "Failed to update Configs",
    };
  }
}
